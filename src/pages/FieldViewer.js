import { apiUrl } from "../config/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  selCurrentBunker,
  selectBunkers,
  selectModified,
  selectName,
  selectPOV,
  selectSet,
} from "../store/build/selectors";
import {
  addBunker,
  deleteBunker,
  setCurrentBunker,
  setPOVonoff,
  setPOVpos,
  setPOVoffset,
  resetPOV,
  resetField,
  setPOVactive,
  setBunkerSingle,
  setBunkerDouble,
  moveBunker,
  mimicSave,
} from "../store/build/slice";
import {
  loadFieldThunk,
  moveBunkerThunk,
  rotateBunker,
  rotateBunkerThunk,
  saveFieldThunk,
} from "../store/build/thunks";
import { selectViewField, selectViewName } from "../store/view/selectors";
import { viewFieldThunk } from "../store/view/thunks";

export const FieldViewer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bunkers = useSelector(selectViewField);
  const bunkersSet = useSelector(selectSet);
  const currentBunker = useSelector(selCurrentBunker);
  const pov = useSelector(selectPOV);
  const name = useSelector(selectViewName);
  const modified = useSelector(selectModified);

  const route_params = useParams();
  const [giveName, setGiveName] = useState("");
  const [zoom, setZoom] = useState({ mag: 1, x: 0, y: -375 });
  const [shadow, setShadow] = useState(2);

  useEffect(() => {
    if (route_params.id !== undefined) {
      dispatch(viewFieldThunk(route_params.id));
    }
  }, [dispatch, route_params]);

  const handleSave = () => {
    dispatch(saveFieldThunk(bunkers, giveName, bunkers.length));
    dispatch(mimicSave(giveName));
    // dispatch(loadFieldsThunk());
    // navigate("/browse");
  };

  const handleShadow = (increase) => {
    // console.log(shadow, increase);
    if (increase) {
      if (shadow < 4) {
        setShadow(shadow + 1);
      }
    } else {
      if (shadow > 1) {
        setShadow(shadow - 1);
      }
    }
  };

  const handleLoad = () => {
    //hardcoded id
    dispatch(loadFieldThunk(1));
  };

  const handleNew = () => {
    dispatch(resetField());
  };

  const allowSave = () => {
    if (bunkers.length > 0 && giveName.length >= 8) {
      return true;
    }
    return false;
  };

  const drawPlayers = () => {
    const handlePointerDown = (e, item) => {
      const el = e.target;
      const bbox = e.target.getBoundingClientRect();
      const x = e.clientX - bbox.left;
      const y = e.clientY - bbox.top;
      el.setPointerCapture(e.pointerId);
      dispatch(setPOVoffset({ index: item, x, y }));
    };
    const handlePointerMove = (e, item) => {
      const bbox = e.target.getBoundingClientRect();
      const x = e.clientX - bbox.left;
      const y = e.clientY - bbox.top;
      if (pov[item].active) {
        dispatch(
          setPOVpos({
            index: item,
            x: pov[item].x - (pov[item].offset.x - x),
            y: pov[item].y - (pov[item].offset.y - y),
          })
        );
      }
    };
    const handlePointerUp = (e, item) => {
      dispatch(setPOVactive(item));
    };

    const drawPOVcircle = (i) => {
      const color = ["red", "orange", "yellow", "blue", "purple"];
      if (!pov[i].on) return;
      return (
        <circle
          cx={pov[i].x}
          cy={pov[i].y}
          r={8}
          stroke="white"
          strokeWidth="2"
          onPointerDown={(e) => handlePointerDown(e, i)}
          onPointerUp={(e) => handlePointerUp(e, i)}
          onPointerMove={(e) => handlePointerMove(e, i)}
          fill={pov[i].active ? "white" : color[i]}
        />
      );
    };

    return <g>{pov.map((el, index) => drawPOVcircle(index))}</g>;
  };

  const drawPOV = (index) => {
    if (!pov[index].on) return;
    //console.log("DRAW POV", index);
    const generateFence = () => {
      let arr = [];
      const [px, py] = [pov[index].x, pov[index].y];
      // console.log("BUNKERS:", bunkers);
      // invert center and edge points
      arr = bunkers.map((b) => {
        if (b.mirror) {
          return {
            ...b,
            center: { x: b.center.x, y: b.center.y * -1 },
            points: b.points.map((p) => {
              return { x: p.x, y: p.y * -1 };
            }),
          };
        } else {
          return b;
        }
      });
      // console.log("INVERT:", arr);
      // get blocker shape
      arr = arr.map((b) => {
        switch (b.type) {
          case "temple":
          case "maya":
          case "giantbrick":
          case "snake":
            // 4 corners bunkers
            // use diagonal that is closer to 90 degrees to POV
            const v1 = { x: b.points[0].x - px, y: b.points[0].y - py };
            const v2 = {
              x: b.points[0].x - b.points[2].x,
              y: b.points[0].y - b.points[2].y,
            };
            const cos1 =
              (v1.x * v2.x + v1.y * v2.y) /
              (Math.sqrt(v1.x * v1.x + v1.y * v1.y) *
                Math.sqrt(v2.x * v2.x + v2.y * v2.y));
            // console.log("COS1:", cos1);
            // console.log("Angle1:", (Math.acos(cos1) * 180) / Math.PI);
            const v3 = { x: b.points[1].x - px, y: b.points[1].y - py };
            const v4 = {
              x: b.points[1].x - b.points[3].x,
              y: b.points[1].y - b.points[3].y,
            };
            const cos2 =
              (v3.x * v4.x + v3.y * v4.y) /
              (Math.sqrt(v3.x * v3.x + v3.y * v3.y) *
                Math.sqrt(v4.x * v4.x + v4.y * v4.y));
            // console.log("COS2:", cos2);
            // console.log("Angle2:", (Math.acos(cos2) * 180) / Math.PI);
            if (
              Math.abs(90 - (Math.acos(cos1) * 180) / Math.PI) <=
              Math.abs(90 - (Math.acos(cos2) * 180) / Math.PI)
            ) {
              return { ...b, points: [b.points[0], b.points[2]] };
            } else {
              return { ...b, points: [b.points[1], b.points[3]] };
            }
          //break;

          case "can":
          case "tree":
          case "dorito":
          case "smalldorito":
            //doritos are similar to can at the center
            const radius = b.dimentions.radius;
            const c = b.center;
            // console.log("RnC:", radius, c);
            //get angle to OX
            const r1 = { x: px - c.x, y: py - c.y };
            const r2 = { x: px - 1, y: py - py };
            const cos1r =
              (r1.x * r2.x + r1.y * r2.y) /
              (Math.sqrt(r1.x * r1.x + r1.y * r1.y) *
                Math.sqrt(r2.x * r2.x + r2.y * r2.y));
            // console.log("POV:", px, py, "C:", c.x, c.y);
            let yy1, yy2;
            const xx1 = c.x + radius * Math.cos(Math.acos(cos1r) - Math.PI / 2);
            const xx2 = c.x + radius * Math.cos(Math.acos(cos1r) + Math.PI / 2);
            if (py <= c.y) {
              yy1 = c.y + radius * Math.sin(Math.acos(cos1r) + Math.PI / 2);
              yy2 = c.y + radius * Math.sin(Math.acos(cos1r) - Math.PI / 2);
            } else {
              yy1 = c.y + radius * Math.sin(Math.acos(cos1r) - Math.PI / 2);
              yy2 = c.y + radius * Math.sin(Math.acos(cos1r) + Math.PI / 2);
            }

            return {
              ...b,
              points: [
                { x: xx1, y: yy1 },
                { x: xx2, y: yy2 },
              ],
            };
          case "cake":
          case "tallcake":
            return { ...b, points: [{ x: b.center.x, y: b.center.y }] };
          //

          default:
            break;
        }
      });
      // console.log("ARR:", arr);
      return arr.map((b) => {
        return b.points;
      });
    };
    const fence = generateFence();
    // console.log("fence:", fence);
    const flatShadowPoints = () => {
      return getShadowPoints().map((x) => x.flat());
    };
    const getShadowPoints = () => {
      // najti dlinu vektora
      // najti proporciiu ot 960
      // umnozhit na proporciiu
      const arr = fence.map((b) =>
        b.map((p) => {
          const xx = pov[index].x - p.x;
          const yy = pov[index].y - p.y;
          // console.log("xx", xx);
          const zz = Math.sqrt(xx * xx + yy * yy);
          const scale = 1000 / zz;
          // console.log("xxx", xxx);
          const xxx = pov[index].x - xx * scale;
          const yyy = pov[index].y - yy * scale;
          // const yyy = -yy * xxx + pov.point.y;
          // console.log(yyy);
          return [p, { x: xxx, y: yyy }];
        })
      );
      return arr;
    };
    const castRays = () => {
      const arr = fence.map((b) =>
        b.map((p) => {
          const xx = pov[index].x - p.x;
          const yy = pov[index].y - p.y;
          const zz = Math.sqrt(xx * xx + yy * yy);
          const scale = 1000 / zz;
          const xxx = pov[index].x - xx * scale;
          const yyy = pov[index].y - yy * scale;
          return drawLine(
            p.x,
            p.y,
            xxx,
            yyy,
            "red",
            Math.floor(Math.random() * 10000)
          );
        })
      );
      return arr;
    };
    const drawBlindZones = () => {
      const arr = flatShadowPoints();
      return (
        <g>
          <clipPath id={`cutout${index}`}>
            {arr.map((x, i) => (
              <polygon
                key={`cut${i}`}
                points={`${x[0].x},${x[0].y} ${x[1].x},${x[1].y} ${x[3].x},${x[3].y} ${x[2].x},${x[2].y}`}
              />
            ))}
          </clipPath>
          <rect
            x="0"
            y="-375"
            width="600"
            height="750"
            fill={pov[index].active ? "white" : "black"}
            clipPath={`url(#cutout${index})`}
            fillOpacity={shadow / 10}
          />
        </g>
      );
    };
    return <g>{drawBlindZones()}</g>;
  };

  const drawField = () => {
    return (
      <g onClick={() => dispatch(setCurrentBunker(null))}>
        <rect
          width={600}
          height={750}
          y={-375}
          fill="#228b22"
          onClick={() => dispatch(setCurrentBunker(null))}
        />
        <rect x="0" y="-375" width="600" height="750" filter="url(#noise)" />
        <defs>
          <filter id="noise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence baseFrequency="0.5 0.05" result="NOISE" />
            <feDiffuseLighting
              in="noise"
              lightingColor="green"
              surfaceScale="1.5"
            >
              <feDistantLight azimuth="180" elevation="65" />
            </feDiffuseLighting>
          </filter>
        </defs>
      </g>
    );
  };
  const buildGrid = () => {
    let output = [];
    for (let i = 0; i <= 600; i = i + 50) {
      // vertical
      output = [...output, drawLine(i, -375, i, 375, "black", i)];
    }
    for (let i = -375; i <= 375; i = i + 50) {
      //horizontal
      output = [...output, drawLine(0, i, 600, i, "black", i)];
    }
    //center
    output = [...output, drawLine(0, 0, 600, 0, "white", "c")];
    return output;
  };

  const drawLine = (x1, y1, x2, y2, color, key) => {
    return (
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeOpacity="75%"
        key={key}
      />
    );
  };

  const drawBanners = () => {
    return (
      <g>
        <rect
          x="285"
          y="365"
          width="30"
          height="20"
          stroke="black"
          fill="blue"
          strokeWidth="2"
        />
        <rect
          x="285"
          y="-385"
          width="30"
          height="20"
          stroke="black"
          fill="blue"
          strokeWidth="2"
        />
      </g>
    );
  };

  const drawBunker = (item) => {
    // const { id, type, set, single, center, length, width, rotation } = item;
    const { id, type, mirror, dimentions } = item;
    let points = item.points;
    let center = item.center;
    if (mirror) {
      points = points.map((p) => {
        return { x: p.x, y: p.y * -1 };
      });
      center = { x: center.x, y: center.y * -1 };
    }

    const handleClick = () => {
      if (currentBunker === id) {
        dispatch(setCurrentBunker(null));
      } else {
        dispatch(setCurrentBunker(id));
      }
    };

    const checkBounds = () => {
      const overBounds = points.map((p) => {
        if (
          p.x < 25 ||
          p.x > 575 ||
          (p.y > 350 && !mirror) ||
          (p.y < -350 && mirror)
        ) {
          return true;
        } else {
          return false;
        }
      });
      // console.log(overBounds);
      return overBounds.includes(true);
    };

    const setColor = () => {
      // check bounds
      if (checkBounds()) {
        //return "red"; bug with no red CAN
      }
      if (currentBunker === id) {
        return mirror ? "orange" : "white";
      } else {
        return "yellow";
      }
    };
    // const [x, y, size, rotation] = [0, 375, 10, 0];

    switch (type) {
      case "giantbrick":
        return (
          <g onClick={handleClick} key={id * (mirror ? 10 : 1)}>
            <polygon
              points={`${points[0].x},${points[0].y} ${points[1].x},${points[1].y} ${points[2].x},${points[2].y} ${points[3].x},${points[3].y}`}
              fill={setColor()}
              stroke="black"
              strokeWidth="2"
            />
            <text
              x={`${center.x - dimentions.length / 5}`}
              y={`${center.y + dimentions.width / 5}`}
            >
              GB
            </text>
          </g>
        );
      case "temple":
        return (
          <g onClick={handleClick} key={id * (mirror ? 10 : 1)}>
            <polygon
              points={`${points[0].x},${points[0].y} ${points[1].x},${points[1].y} ${points[2].x},${points[2].y} ${points[3].x},${points[3].y}`}
              fill={setColor()}
              stroke="black"
              strokeWidth="2"
            />
            <text
              x={`${center.x - dimentions.length / 5}`}
              y={`${center.y + dimentions.width / 5}`}
            >
              T
            </text>
          </g>
        );
      case "maya":
        return (
          <g onClick={handleClick} key={id * (mirror ? 10 : 1)}>
            <polygon
              points={`${points[0].x},${points[0].y} ${points[1].x},${points[1].y} ${points[2].x},${points[2].y} ${points[3].x},${points[3].y}`}
              fill={setColor()}
              stroke="black"
              strokeWidth="2"
            />
            <text
              x={`${center.x - dimentions.length / 5}`}
              y={`${center.y + dimentions.width / 5}`}
            >
              M
            </text>
          </g>
        );
      case "snake":
        return (
          <g onClick={handleClick} key={id * (mirror ? 10 : 1)}>
            <polygon
              points={`${points[0].x},${points[0].y} ${points[1].x},${points[1].y} ${points[2].x},${points[2].y} ${points[3].x},${points[3].y}`}
              fill={setColor()}
              stroke="black"
              strokeWidth="2"
            />
          </g>
        );
      case "can":
        return (
          <g onClick={handleClick} key={id * (mirror ? 10 : 1)}>
            <circle
              cx={`${center.x}`}
              cy={`${center.y}`}
              r={`${dimentions.radius}`}
              stroke="black"
              fill={setColor()}
              strokeWidth="2"
            />
            <text
              x={`${center.x - dimentions.length / 5}`}
              y={`${center.y + dimentions.width / 5}`}
            >
              C
            </text>
          </g>
        );
      case "tree":
        return (
          <g onClick={handleClick} key={id * (mirror ? 10 : 1)}>
            <circle
              cx={`${center.x}`}
              cy={`${center.y}`}
              r={`${dimentions.radius}`}
              stroke="black"
              fill={setColor()}
              strokeWidth="2"
            />
            <text
              x={`${center.x - dimentions.length / 5}`}
              y={`${center.y + dimentions.width / 5}`}
            >
              T
            </text>
          </g>
        );
      case "dorito":
        return (
          <g onClick={handleClick} key={id * (mirror ? 10 : 1)}>
            <polygon
              points={`${points[0].x},${points[0].y} ${points[1].x},${points[1].y} ${points[2].x},${points[2].y}`}
              fill={setColor()}
              stroke="black"
              strokeWidth="2"
            />
            <polygon
              points={`${points[0].x},${points[0].y} ${points[1].x},${points[1].y} ${points[2].x},${points[2].y}`}
              fill="black"
              transform="scale(0.2)"
              transform-origin={`${center.x} ${center.y}`}
            />
          </g>
        );
      case "smalldorito":
        return (
          <g onClick={handleClick} key={id * (mirror ? 10 : 1)}>
            <polygon
              points={`${points[0].x},${points[0].y} ${points[1].x},${points[1].y} ${points[2].x},${points[2].y}`}
              fill={setColor()}
              stroke="black"
              strokeWidth="2"
            />
            <polygon
              points={`${points[0].x},${points[0].y} ${points[1].x},${points[1].y} ${points[2].x},${points[2].y}`}
              fill="black"
              transform="scale(0.2)"
              transform-origin={`${center.x} ${center.y}`}
            />
          </g>
        );

      default:
        return;
      // break;
    }
  };

  const drawSaveField = () => {
    if (!modified) return;
    return (
      <div style={{ padding: "1.2em" }}>
        <input type="text" onChange={(e) => setGiveName(e.target.value)} />
        <button onClick={handleSave} disabled={!allowSave()}>
          SAVE
        </button>
      </div>
    );
  };

  // OUTPUT

  return (
    <div style={{ margin: "1em", minWidth: "1200px" }}>
      <div style={{ display: "flex" }}>
        <div>
          <h4>Name: {name}</h4>
        </div>
        {/* {drawSaveField()}
        <div style={{ padding: "1.2em" }}>
          <button onClick={handleNew}>NEW FIELD</button>
        </div> */}
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "25%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <button
              className="share"
              disabled={!route_params.id}
              onClick={() => navigate(`/share/${route_params.id}`)}
            >
              SHARE this layout
            </button>
            <button
              className="share"
              disabled={!route_params.id}
              onClick={() =>
                (window.location.href = `${apiUrl}/field/svg/${route_params.id}`)
              }
            >
              Export SVG file
            </button>
            <button
              className="share"
              disabled={!route_params.id}
              onClick={() =>
                (window.location.href = `${apiUrl}/field/jpg/${route_params.id}`)
              }
            >
              Export JPG file
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* 222 */}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p>POV:</p>
            <div>
              <button
                className="pov"
                style={{
                  backgroundColor: "red",
                }}
                onClick={() => dispatch(setPOVonoff(0))}
              >
                {pov[0].on ? "O" : "I"}
              </button>
              <button
                className="pov"
                style={{
                  backgroundColor: "orange",
                }}
                onClick={() => dispatch(setPOVonoff(1))}
              >
                {pov[1].on ? "O" : "I"}
              </button>
              <button
                className="pov"
                style={{ backgroundColor: "yellow" }}
                onClick={() => dispatch(setPOVonoff(2))}
              >
                {pov[2].on ? "O" : "I"}
              </button>
              <button
                className="pov"
                style={{
                  backgroundColor: "blue",
                }}
                onClick={() => dispatch(setPOVonoff(3))}
              >
                {pov[3].on ? "O" : "I"}
              </button>
              <button
                className="pov"
                style={{
                  backgroundColor: "purple",
                }}
                onClick={() => dispatch(setPOVonoff(4))}
              >
                {pov[4].on ? "O" : "I"}
              </button>
              <button
                className="pov"
                style={{
                  backgroundColor: "white",
                }}
                onClick={() => dispatch(resetPOV())}
              >
                R
              </button>
            </div>
            <div>
              <button
                className="shadow-light"
                onClick={() => handleShadow(false)}
              >
                lighter
              </button>
              <button
                className="shadow-dark"
                onClick={() => handleShadow(true)}
              >
                darker
              </button>
            </div>
          </div>
          {/* <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          ></div>
          <div>
            {`Zoom: `}
            <button onClick={() => setZoom({ mag: 2, x: 0, y: -375 })}>
              x0.5
            </button>
            <button onClick={() => setZoom({ mag: 1, x: 0, y: -375 })}>
              x1.0
            </button>
            <button onClick={() => setZoom({ mag: 0.5, x: 0, y: -375 })}>
              x2.0
            </button>
            {` - `}
            <button
              onClick={() =>
                setZoom({ mag: zoom.mag, x: zoom.x - 75, y: zoom.y })
              }
            >
              {"<"}
            </button>
            <button
              onClick={() =>
                setZoom({ mag: zoom.mag, x: zoom.x, y: zoom.y - 93.75 })
              }
            >
              {"^"}
            </button>
            <button
              onClick={() =>
                setZoom({ mag: zoom.mag, x: zoom.x, y: zoom.y + 93.75 })
              }
            >
              {"v"}
            </button>
            <button
              onClick={() =>
                setZoom({ mag: zoom.mag, x: zoom.x + 75, y: zoom.y })
              }
            >
              {">"}
            </button>
          </div> */}
        </div>
        <div style={{ width: "75%" }}>
          <svg
            viewBox={`${zoom.x} ${zoom.y} ${600 * zoom.mag} ${750 * zoom.mag}`}
            width={600}
            height={750}
            version="1.1"
          >
            {drawField()}
            {buildGrid()}
            {drawBanners()}
            {pov.map((el, index) => drawPOV(index))}
            {bunkers.map((b) => drawBunker(b))}
            {drawPlayers()}
          </svg>
        </div>
      </div>
    </div>
  );
};
