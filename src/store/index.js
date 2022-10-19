import { configureStore } from "@reduxjs/toolkit";

import appStateReducer from "./appState/slice";
import userReducer from "./user/slice";
import buildReducer from "./build/slice";
import viewReducer from "./view/slice";

export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    build: buildReducer,
    view: viewReducer,
  },
});
