import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { Box, Flex, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import LatestPost from "../components/LatestPost";
import HeadingBlog from "../components/HeadingBlog";
import { BASE_URL } from "../utils/config.js";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(`${BASE_URL}/users/getAllPosts`);
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
    <Box position="relative" margin="150px auto" maxWidth="900px">
      <HeadingBlog />
      {posts.length > 0 && <LatestPost {...posts[0]} />}
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={4}
        zIndex="1"
        position="relative"
        justifyContent={"center"}
      >
        {posts.length > 0 &&
          posts.map((post) => (
            <GridItem key={post._id}>
              <Post {...post} />
            </GridItem>
          ))}
      </Grid>
    </Box>
  );
};

export default Home;
