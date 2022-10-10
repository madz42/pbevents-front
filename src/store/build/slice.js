import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  selected: null,
  set: {
    //eu
    temple: 4,
    maya: 4,
    can: 4,
    tree: 4,
    dorito: 6,
    smalldorito: 2,
    tallcake: 4,
    cake: 4,
    snake: 6,
    brick: 4,
    giantbrick: 2,
    wing: 4,
  },
  defaults: {
    temple: {
      type: "temple",
      rotate: { fix: true, angle: 0 },
      id: 0,
      single: false,
      mirror: false,
      center: { x: 15, y: 15 },
      dimentions: { length: 30, width: 30, radius: 15 },
      points: [
        { x: 0, y: 0 },
        { x: 0, y: 30 },
        { x: 30, y: 30 },
        { x: 30, y: 0 },
      ],
    },
    can: {
      type: "can",
      rotate: { fix: true, angle: 0 },
      id: 0,
      single: false,
      mirror: false,
      center: { x: 15, y: 15 },
      dimentions: { length: 30, width: 30, radius: 15 },
      points: [],
    },
    tree: {
      type: "tree",
      rotate: { fix: true, angle: 0 },
      id: 0,
      single: false,
      mirror: false,
      center: { x: 12.5, y: 12.5 },
      dimentions: { length: 25, width: 25, radius: 12.5 },
      points: [],
    },
    dorito: {
      type: "dorito",
      rotate: { fix: false, angle: 0 },
      id: 0,
      single: false,
      mirror: false,
      center: { x: 9.52633, y: 16.5 },
      dimentions: { length: 33, width: 33, radius: 0 },
      points: [
        { x: 0, y: 0 },
        { x: 0, y: 33 },
        { x: 28.579, y: 16.5 },
      ],
    },
    smalldorito: {
      type: "smalldorito",
      rotate: { fix: false, angle: 0 },
      id: 0,
      single: false,
      mirror: false,
      center: { x: 7.21666, y: 12.5 },
      dimentions: { length: 25, width: 25, radius: 0 },
      points: [
        { x: 0, y: 0 },
        { x: 0, y: 25 },
        { x: 21.65, y: 12.5 },
      ],
    },
  },
  bunkers: [],
};

export const buildSlice = createSlice({
  name: "build",
  initialState,
  reducers: {
    addBunker: (state, action) => {
      // console.log(action.payload);
      // console.log(current(state.defaults[action.payload]));
      const genId = Math.ceil(Math.random() * 1000);
      state.bunkers = [
        ...state.bunkers,
        { ...current(state.defaults[action.payload]), id: genId },
        {
          ...current(state.defaults[action.payload]),
          id: genId, //id: genId * 10,
          mirror: true,
        },
      ];
      state.selected = genId;
    },
    moveBunker: (state, action) => {
      state.bunkers = state.bunkers.map((b) => {
        if (action.payload.id === b.id) {
          return {
            ...b,
            points: b.points.map((p) => {
              return { x: p.x + action.payload.x, y: p.y + action.payload.y };
            }),
            center: {
              x: b.center.x + action.payload.x,
              y: b.center.y + action.payload.y,
            },
          };
        } else {
          return b;
        }
      });
    },
    rotateBunker: (state, action) => {
      // state.bunkers = state.bunkers.map((b) => {
      //   if (action.payload.id === b.id) {
      //     return {
      //       ...b,
      //       points: b.points.map((p) => {
      //         return { x: p.x + action.payload.x, y: p.y + action.payload.y };
      //       }),
      //       center: {
      //         x: b.center.x + action.payload.x,
      //         y: b.center.y + action.payload.y,
      //       },
      //     };
      //   } else {
      //     return b;
      //   }
      // });
    },
    setCurrentBunker: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { rotateBunker, moveBunker, addBunker, setCurrentBunker } =
  buildSlice.actions;

export default buildSlice.reducer;
