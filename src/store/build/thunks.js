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
    //dispatch(moveBunker());
    const bunker = getState().build.bunkers.find((x) => x.id === id);
    switch (bunker.type) {
      case "dorito":
      case "smalldorito":
      case "cake":
      case "tallcake":
        // dispatch(moveBunker({ id, x: 0, y: -25 }));
        console.log(bunker.type, "rotate");
        // bunker = "";
        dispatch(rotateBunker());
        break;
      default:
        console.log(bunker.type, "ignore");
        break;
    }
  };
};
