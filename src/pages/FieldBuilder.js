import { useDispatch, useSelector } from "react-redux";
import { selCurrentBunker, selectBunkers } from "../store/build/selectors";
import { addBunker, setCurrentBunker } from "../store/build/slice";
import {
  moveBunker,
  moveBunkerThunk,
  rotateBunker,
  rotateBunkerThunk,
} from "../store/build/thunks";

export const FieldBuilder = () => {
  const bunkers = useSelector(selectBunkers);
  const currentBunker = useSelector(selCurrentBunker);
  const dispatch = useDispatch();

  const drawField = () => {
    return (
      <rect
        width={600}
        height={750}
        y={-375}
        fill="#228b22"
        onClick={() => dispatch(setCurrentBunker(null))}
      />
    );
  };
  const buildGrid = () => {
    let output = [];
    for (let i = 0; i <= 600; i = i + 50) {
      // vertical
      output = [...output, drawLine(i, -375, i, 375, "black")];
    }
    for (let i = -375; i <= 375; i = i + 50) {
      //horizontal
      output = [...output, drawLine(0, i, 600, i, "black")];
    }
    //center
    output = [...output, drawLine(0, 0, 600, 0, "white")];
    return output;
  };

  const drawLine = (x1, y1, x2, y2, color) => {
    return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} />;
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
      dispatch(setCurrentBunker(id));
    };

    const setColor = () => {
      if (currentBunker === id) {
        return mirror ? "orange" : "white";
      } else {
        return "yellow";
      }
    };
    // const [x, y, size, rotation] = [0, 375, 10, 0];

    switch (type) {
      case "temple":
        return (
          <g onClick={handleClick}>
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
          <g onClick={handleClick}>
            <circle
              cx={`${center.x}`}
              cy={`${center.y}`}
              r={`${dimentions.radius}`}
              stroke="black"
              fill={setColor()}
              strokeWidth="2"
            />
          </g>
        );
      case "tree":
        return (
          <g onClick={handleClick}>
            <circle
              cx={`${center.x}`}
              cy={`${center.y}`}
              r={`${dimentions.radius}`}
              stroke="black"
              fill={setColor()}
              strokeWidth="2"
            />
          </g>
        );
      case "dorito":
        return (
          <g onClick={handleClick}>
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
          <g onClick={handleClick}>
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

    // return (
    //   <g>
    //     <rect
    //       x={`${x}`}
    //       y={`${y}`}
    //       width={size}
    //       height={size}
    //       stroke="black"
    //       fill="yellow"
    //       strokeWidth="3"
    //       transform={`rotate(${rotation})`}
    //       transform-origin={`${x + size / 2} ${y + size / 2}`}
    //       onClick={() => console.log("poof!")}
    //     />
    //     <rect
    //       x={`${x + 5}`}
    //       y={`${y + 5}`}
    //       width={size - 10}
    //       height={size - 10}
    //       stroke="black"
    //       fill="yellow"
    //       strokeWidth="1"
    //       transform={`rotate(${rotation})`}
    //       transform-origin={`${x + size / 2} ${y + size / 2}`}
    //       onClick={() => console.log("poof!")}
    //     />
    //     {/* <text
    //       x={`${x + size / 2 - 5}`}
    //       y={`${y + size / 2 + 5}`}
    //       onClick={() => console.log("poof too!")}
    //     >
    //       T
    //     </text> */}
    //   </g>
    // );
  };

  return (
    <div style={{ display: "flex", margin: "2em" }}>
      <div style={{ width: "25%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button
            style={{ width: "5em", height: "5em" }}
            disabled={!currentBunker}
            onClick={() => dispatch(moveBunkerThunk("up", currentBunker))}
          >
            UP
          </button>
          <div>
            <button
              style={{ width: "5em", height: "5em" }}
              disabled={!currentBunker}
              onClick={() => dispatch(moveBunkerThunk("left", currentBunker))}
            >
              LEFT
            </button>
            <button
              style={{ width: "5em", height: "5em" }}
              disabled={!currentBunker}
              onClick={() => dispatch(rotateBunkerThunk(currentBunker))}
            >
              Rotate
            </button>
            <button
              style={{ width: "5em", height: "5em" }}
              disabled={!currentBunker}
              onClick={() => dispatch(moveBunkerThunk("right", currentBunker))}
            >
              RIGHT
            </button>
          </div>
          <button
            style={{ width: "5em", height: "5em" }}
            disabled={!currentBunker}
            onClick={() => dispatch(moveBunkerThunk("down", currentBunker))}
          >
            DOWN
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <br />
          <button
            style={{ width: "6em" }}
            onClick={() => dispatch(addBunker("temple"))}
          >
            Temple
          </button>
          <button
            style={{ width: "6em" }}
            onClick={() => dispatch(addBunker("can"))}
          >
            Can
          </button>
          <button
            style={{ width: "6em" }}
            onClick={() => dispatch(addBunker("dorito"))}
          >
            Dorito
          </button>
          <button
            style={{ width: "6em" }}
            onClick={() => dispatch(addBunker("smalldorito"))}
          >
            Sm Dorito
          </button>
          <button
            style={{ width: "6em" }}
            onClick={() => dispatch(addBunker("tree"))}
          >
            Tree
          </button>
          <button style={{ width: "6em" }}>Brick</button>
          <button style={{ width: "6em" }}>Wing</button>
          <button style={{ width: "6em" }}>Temple</button>
          <button style={{ width: "6em" }}>Temple</button>
          <button style={{ width: "6em" }}>Temple</button>
        </div>
      </div>
      <div style={{ width: "75%" }}>
        <svg viewBox="0 -375 600 750" width={600} height={750} version="1.1">
          {drawField()}
          {buildGrid()}
          {bunkers.map((b) => drawBunker(b))}
        </svg>
      </div>
    </div>
  );
};
