import { moveBunker, rotateBunker } from "./slice";

export const moveBunkerThunk = (direction, id) => {
  return async (dispatch, getState) => {
    //dispatch(moveBunker());
    console.log(direction, id);
    switch (direction) {
      case "left":
        dispatch(moveBunker({ id, x: -25, y: 0 }));
        break;
      case "right":
        dispatch(moveBunker({ id, x: 25, y: 0 }));
        break;
      case "up":
        dispatch(moveBunker({ id, x: 0, y: -25 }));
        break;
      case "down":
        dispatch(moveBunker({ id, x: 0, y: 25 }));
        break;

      default:
        break;
    }
  };
};

export const rotateBunkerThunk = (id) => {
  return async (dispatch, getState) => {
    const bunker = getState().build.bunkers.find((x) => x.id === id);
    const [length, width] = [bunker.dimentions.length, bunker.dimentions.width];
    const [cx, cy] = [bunker.center.x, bunker.center.y];
    const height = (bunker.dimentions.length * Math.sqrt(3)) / 2;
    let points = [];
    switch (bunker.type) {
      case "dorito":
      case "smalldorito":
      case "cake":
      case "tallcake":
        // console.log(bunker.type, "rotate");
        switch (bunker.rotate.angle) {
          case 0:
            //  > to v
            points = [
              { x: cx - length / 2, y: cy - height / 3 },
              { x: cx + length / 2, y: cy - height / 3 },
              { x: cx, y: cy + (height * 2) / 3 },
            ];
            dispatch(rotateBunker({ id, points, angle: 90 }));
            break;
          case 90:
            //  v to <
            points = [
              { x: cx + height / 3, y: cy - length / 2 },
              { x: cx + height / 3, y: cy + length / 2 },
              { x: cx - (height * 2) / 3, y: cy },
            ];
            dispatch(rotateBunker({ id, points, angle: 180 }));
            break;
          case 180:
            //  < to ^
            points = [
              { x: cx - length / 2, y: cy + height / 3 },
              { x: cx + length / 2, y: cy + height / 3 },
              { x: cx, y: cy - (height * 2) / 3 },
            ];
            dispatch(rotateBunker({ id, points, angle: 270 }));
            break;
          case 270:
            // ^ to >
            points = [
              { x: cx - height / 3, y: cy - length / 2 },
              { x: cx - height / 3, y: cy + length / 2 },
              { x: cx + (height * 2) / 3, y: cy },
            ];
            dispatch(rotateBunker({ id, points, angle: 0 }));
            break;

          default:
            break;
        }
        // dispatch(rotateBunker());
        break;

      case "giantbrick":
      case "snake":
        switch (bunker.rotate.angle) {
          case 0:
          case 180:
            points = [
              { x: cx - length / 2, y: cy - width / 2 },
              { x: cx - length / 2, y: cy + width / 2 },
              { x: cx + length / 2, y: cy + width / 2 },
              { x: cx + length / 2, y: cy - width / 2 },
            ];
            dispatch(rotateBunker({ id, points, angle: 90 }));
            break;

          case 90:
          case 270:
            points = [
              { x: cx - width / 2, y: cy - length / 2 },
              { x: cx - width / 2, y: cy + length / 2 },
              { x: cx + width / 2, y: cy + length / 2 },
              { x: cx + width / 2, y: cy - length / 2 },
            ];
            dispatch(rotateBunker({ id, points, angle: 0 }));
            break;

          default:
            break;
        }
        break;
      default:
        console.log(bunker.type, "ignore");
        break;
    }
  };
};
