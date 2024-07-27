import "./App.css";
import Header from "./components/Header";
import Post from "./components/Post";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserProvider } from "./context_api/UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import PrivateRoute from "./components/private_route/PrivateRoute";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />
          <Route
            path="/post/:id"
            element={
              <PrivateRoute>
                <PostPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditPost />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
