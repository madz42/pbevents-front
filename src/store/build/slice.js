import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  selected: null,
  pov: {
    on: false,
    point: { x: 300, y: 350 },
    // shadows: [],
    // fence: [],
  },
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
      center: { x: 12.5, y: 12.5 },
      dimentions: { length: 25, width: 25, radius: 0 },
      points: [
        { x: 0, y: 0 },
        { x: 0, y: 25 },
        { x: 25, y: 25 },
        { x: 25, y: 0 },
      ],
    },
    maya: {
      type: "maya",
      rotate: { fix: true, angle: 0 },
      id: 0,
      single: false,
      mirror: false,
      center: { x: 12.5, y: 12.5 },
      dimentions: { length: 25, width: 25, radius: 0 },
      points: [
        { x: 0, y: 0 },
        { x: 0, y: 25 },
        { x: 25, y: 25 },
        { x: 25, y: 0 },
      ],
    },
    snake: {
      type: "snake",
      rotate: { fix: false, angle: 0 },
      id: 0,
      single: false,
      mirror: false,
      center: { x: 6.25, y: 25 },
      dimentions: { length: 50, width: 12.5, radius: 0 },
      points: [
        { x: 0, y: 0 },
        { x: 0, y: 50 },
        { x: 12.5, y: 50 },
        { x: 12.5, y: 0 },
      ],
    },
    giantbrick: {
      type: "giantbrick",
      rotate: { fix: false, angle: 0 },
      id: 0,
      single: false,
      mirror: false,
      center: { x: 25, y: 12.5 },
      dimentions: { length: 50, width: 25, radius: 0 },
      points: [
        { x: 0, y: 0 },
        { x: 50, y: 0 },
        { x: 50, y: 25 },
        { x: 0, y: 25 },
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
      points: [{ x: 0, y: 0 }],
    },
    tree: {
      type: "tree",
      rotate: { fix: true, angle: 0 },
      id: 0,
      single: false,
      mirror: false,
      center: { x: 12.5, y: 12.5 },
      dimentions: { length: 25, width: 25, radius: 12.5 },
      points: [{ x: 0, y: 0 }],
    },
    dorito: {
      type: "dorito",
      rotate: { fix: false, angle: 0 },
      id: 0,
      single: false,
      mirror: false,
      center: { x: 9.52633, y: 16.5 },
      dimentions: { length: 33, width: 33, radius: 9.52633 },
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
      dimentions: { length: 25, width: 25, radius: 7.21666 },
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
    loadBunkers: (state, action) => {
      state.bunkers = action.payload;
      state.selected = null;
    },
    addBunker: (state, action) => {
      if (state.bunkers.length <= 49) {
        let genId = 0;
        //console.log("---");
        do {
          genId += 1;
        } while (state.bunkers.find((x) => x.id === genId));
        state.bunkers = [
          ...state.bunkers,
          { ...current(state.defaults[action.payload]), id: genId },
          {
            ...current(state.defaults[action.payload]),
            id: genId,
            mirror: true,
          },
        ];
        state.selected = genId;
      }
    },
    deleteBunker: (state, action) => {
      state.bunkers = state.bunkers.filter((b) => b.id !== action.payload);
      state.selected = null;
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
      state.bunkers = state.bunkers.map((b) => {
        if (action.payload.id === b.id) {
          return {
            ...b,
            points: action.payload.points,
            rotate: { ...b.rotate, angle: action.payload.angle },
          };
        } else {
          return b;
        }
      });
    },
    setCurrentBunker: (state, action) => {
      state.selected = action.payload;
    },
    setPOVonoff: (state, action) => {
      state.pov.on = !state.pov.on;
    },
    movePOV: (state, action) => {
      state.pov.point = {
        x: state.pov.point.x + action.payload.x,
        y: state.pov.point.y + action.payload.y,
      };
    },
    setPOV: (state, action) => {
      state.pov.point = {
        x: action.payload.x,
        y: action.payload.y,
      };
    },
    resetPOV: (state, action) => {
      state.pov.point = { x: 300, y: 350 };
    },
    resetField: (state, action) => {
      state.bunkers = [];
      state.pov.point = { x: 300, y: 350 };
      state.selected = null;
    },
  },
});

export const {
  loadBunkers,
  rotateBunker,
  moveBunker,
  addBunker,
  deleteBunker,
  setCurrentBunker,
  setPOVonoff,
  movePOV,
  resetPOV,
  setPOV,
  resetField,
} = buildSlice.actions;

export default buildSlice.reducer;
