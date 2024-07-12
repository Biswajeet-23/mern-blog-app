import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context_api/UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://127.0.0.4:4000/users/profile", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((user) => {
          setUserInfo(user);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    };
    fetchData();
  }, [setUserInfo]);

  const logout = async () => {
    await fetch("http://127.0.0.4:4000/users/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserInfo(null);
  };

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username ? (
          <>
            <Link to="/create">Create new Post</Link>
            <a onClick={logout}>Logout {username}</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
