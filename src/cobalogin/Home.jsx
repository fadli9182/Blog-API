import axios from "axios";
import React, { useEffect, useState } from "react";
import AddPost from "./AddPost";
import Navigasi from "./Navigasi";
// import PostList from "./PostList";
import { getAccessToken } from "./utils/api";

function Home() {
  const [post, setPost] = useState([]);

  const getData = async () => {
    try {
      let res = await axios.get(`https://jcc.brandingyou.id/api/post`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
      });
      setPost(res.data.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getData();
    console.log("render");
  }, []);

  return (
    <>
      <Navigasi />
      <div className="container mt-5">
        <AddPost getdata={getData} post={post} />
        {/* <div className="row">
          <PostList key={post.id} post={post} getdata={getData} />
        </div> */}
      </div>
    </>
  );
}

export default Home;
