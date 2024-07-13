import React, { useEffect, useState } from "react";
import Post from "../components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch("http://127.0.0.4:4000/users/getAllPosts");
        if (response.status === 200) {
          const data = response.json();
          data.then((users) => setPosts(users));
        }
      };
      fetchData();
    } catch (err) {
      console.error(err.message);
    }
  }, []);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </>
  );
};

export default Home;
