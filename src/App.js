import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserWithStoredToken } from "./store/user/thunks";
import { Routes, Route } from "react-router-dom";
import { Navigation, MessageBox, Footer } from "./components";
import {
  FieldViewer,
  FieldBuilder,
  Homepage,
  Login,
  SignUp,
  FieldList,
  SharePage,
} from "./pages";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div style={{ backgroundColor: "white" }}>
      <Navigation />
      <MessageBox />
      <div
        style={{
          minHeight: "700px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/browse" element={<FieldList />} />
          <Route path="/build" element={<FieldBuilder />} />
          <Route path="/build/:id" element={<FieldBuilder />} />
          <Route path="/view" element={<FieldViewer />} />
          <Route path="/view/:id" element={<FieldViewer />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/share/:fid" element={<SharePage />} />
          <Route path="/share/:fid/:pid" element={<SharePage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
