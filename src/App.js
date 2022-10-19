import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserWithStoredToken } from "./store/user/thunks";
import { Routes, Route } from "react-router-dom";
import { Navigation, MessageBox } from "./components";
import {
  FieldViewer,
  FieldBuilder,
  Homepage,
  Login,
  SignUp,
  FieldList,
} from "./pages";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div>
      <Navigation />
      <MessageBox />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/browse" element={<FieldList />} />
        <Route path="/build" element={<FieldBuilder />} />
        <Route path="/build/:id" element={<FieldBuilder />} />
        <Route path="/view" element={<FieldViewer />} />
        <Route path="/view/:id" element={<FieldViewer />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
