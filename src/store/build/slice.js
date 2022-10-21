import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  selected: null,
  name: "Some new field layout",
  modified: false,
  pov: [
    // on: false,
    // point: { x: 300, y: 350 },
    // shadows: [],
    // fence: [],
    {
      on: false,
      x: 300,
      y: 350,
      active: false,
      offset: { x: 0, y: 0 },
    },
    {
      on: false,
      x: 320,
      y: 350,
      active: false,
      offset: { x: 0, y: 0 },
    },
    {
      on: false,
      x: 280,
      y: 350,
      active: false,
      offset: { x: 0, y: 0 },
    },
    {
      on: false,
      x: 310,
      y: 350,
      active: false,
      offset: { x: 0, y: 0 },
    },
    {
      on: false,
      x: 290,
      y: 350,
      active: false,
      offset: { x: 0, y: 0 },
    },
  ],
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
      center: { x: 50, y: 25 },
      dimentions: { length: 25, width: 25, radius: 0 },
      points: [
        { x: 37.5, y: 12.5 },
        { x: 37.5, y: 37.5 },
        { x: 62.5, y: 37.5 },
        { x: 62.5, y: 12.5 },
      ],
    },
    maya: {
      type: "maya",
      rotate: { fix: true, angle: 0 },
      id: 0,
      single: false,
      mirror: false,
      center: { x: 50, y: 25 },
      dimentions: { length: 25, width: 25, radius: 0 },
      points: [
        { x: 37.5, y: 12.5 },
        { x: 37.5, y: 37.5 },
        { x: 62.5, y: 37.5 },
        { x: 62.5, y: 12.5 },
      ],
    },
    snake: {
      type: "snake",
      rotate: { fix: false, angle: 0 },
      id: 0,
      single: false,
      mirror: false,
      center: { x: 50, y: 25 },
      dimentions: { length: 50, width: 12.5, radius: 0 },
      points: [
        { x: 43.75, y: 0 },
        { x: 43.75, y: 50 },
        { x: 56.25, y: 50 },
        { x: 56.25, y: 0 },
      ],
    },
    giantbrick: {
      type: "giantbrick",
      rotate: { fix: false, angle: 0 },
      id: 0,
      single: false,
      mirror: false,
      center: { x: 50, y: 25 },
      dimentions: { length: 50, width: 25, radius: 0 },
      points: [
        { x: 25, y: 12.5 },
        { x: 75, y: 12.5 },
        { x: 75, y: 37.5 },
        { x: 25, y: 37.5 },
      ],
    },
    can: {
      type: "can",
      rotate: { fix: true, angle: 0 },
      id: 0,
      single: false,
      mirror: false,
      center: { x: 50, y: 25 },
      dimentions: { length: 30, width: 30, radius: 15 },
      points: [{ x: 0, y: 0 }],
    },
    tree: {
      type: "tree",
      rotate: { fix: true, angle: 0 },
      id: 0,
      single: false,
      mirror: false,
      center: { x: 50, y: 25 },
      dimentions: { length: 25, width: 25, radius: 12.5 },
      points: [{ x: 0, y: 0 }],
    },
    dorito: {
      type: "dorito",
      rotate: { fix: false, angle: 0 },
      id: 0,
      single: false,
      mirror: false,
      center: { x: 50, y: 25 },
      dimentions: { length: 33, width: 33, radius: 9.52633 },
      points: [
        { x: 0 + 50 - 9.52633, y: 0 + 25 - 16.5 },
        { x: 0 + 50 - 9.52633, y: 33 + 25 - 16.5 },
        { x: 28.579 + 50 - 9.52633, y: 16.5 + 25 - 16.5 },
      ],
    },
    smalldorito: {
      type: "smalldorito",
      rotate: { fix: false, angle: 0 },
      id: 0,
      single: false,
      mirror: false,
      center: { x: 50, y: 25 },
      dimentions: { length: 25, width: 25, radius: 7.21666 },
      points: [
        { x: 0 + 50 - 7.21666, y: 0 + 25 - 12.5 },
        { x: 0 + 50 - 7.21666, y: 25 + 25 - 12.5 },
        { x: 21.65 + 50 - 7.21666, y: 12.5 + 25 - 12.5 },
      ],
    },
  },
  bunkers: [],
};

export const buildSlice = createSlice({
  name: "build",
  initialState,
  reducers: {
    mimicSave: (state, action) => {
      state.name = action.payload;
      state.modified = false;
    },
    loadBunkers: (state, action) => {
      state.bunkers = action.payload.data;
      state.name = action.payload.name;
      state.modified = false;
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
        state.modified = true;
      }
    },
    deleteBunker: (state, action) => {
      state.modified = true;
      state.bunkers = state.bunkers.filter((b) => b.id !== action.payload);
      state.selected = null;
    },
    setBunkerSingle: (state, action) => {
      state.bunkers = state.bunkers.map((b) => {
        if (b.id === action.payload) {
          return { ...b, center: { ...b.center, y: 0 } };
        } else return b;
      });
      state.bunkers = state.bunkers.filter(
        (b) => b.id !== action.payload || !b.mirror
      );
    },
    setBunkerDouble: (state, action) => {
      const toCopy = state.bunkers.find((b) => b.id === action.payload);
      // console.log(toCopy);
      state.bunkers = [...state.bunkers, { ...toCopy, mirror: true }];
    },
    moveBunker: (state, action) => {
      state.modified = true;
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
      state.modified = true;
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
      // state.pov.on = !state.pov.on;
      state.pov = state.pov.map((el, index) => {
        if (index === action.payload) {
          return { ...el, on: !el.on };
        } else return el;
      });
    },
    setPOVpos: (state, action) => {
      state.pov = state.pov.map((el, index) => {
        if (index === action.payload.index) {
          return { ...el, x: action.payload.x, y: action.payload.y };
        } else return el;
      });
      // state.pov.point = {
      //   x: state.pov.point.x + action.payload.x,
      //   y: state.pov.point.y + action.payload.y,
      // };
    },
    setPOVoffset: (state, action) => {
      state.pov = state.pov.map((el, index) => {
        if (index === action.payload.index) {
          return {
            ...el,
            active: true,
            offset: { x: action.payload.x, y: action.payload.y },
          };
        } else return el;
      });
      // state.pov.point = {
      //   x: action.payload.x,
      //   y: action.payload.y,
      // };
    },
    setPOVactive: (state, action) => {
      // state.pov.on = !state.pov.on;
      state.pov = state.pov.map((el, index) => {
        if (index === action.payload) {
          return { ...el, active: false };
        } else return el;
      });
    },
    resetPOV: (state, action) => {
      state.pov[0].x = 300;
      state.pov[0].y = 350;
      state.pov[1].x = 320;
      state.pov[1].y = 350;
      state.pov[2].x = 280;
      state.pov[2].y = 350;
      state.pov[3].x = 310;
      state.pov[3].y = 350;
      state.pov[4].x = 290;
      state.pov[4].y = 350;
    },
    resetField: (state, action) => {
      state.bunkers = [];
      state.selected = null;
      state.modified = false;
      state.name = "Some new field layout";
    },
  },
});

export const {
  loadBunkers,
  rotateBunker,
  moveBunker,
  addBunker,
  deleteBunker,
  setBunkerSingle,
  setBunkerDouble,
  setCurrentBunker,
  setPOVonoff,
  setPOVoffset,
  setPOVpos,
  setPOVactive,
  resetPOV,
  setPOV,
  resetField,
  mimicSave,
} = buildSlice.actions;

export default buildSlice.reducer;
