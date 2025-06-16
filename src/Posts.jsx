import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
export default function Posts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get("https://tarmeezacademy.com/api/v1/posts?limit=50")
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
        // console.log(response.data.data[0].image);
        // console.log(response.data.data[0].comments);
        // console.log(response.data.data[0].body);
        // console.log(response.data.data[0].author.profile_image);
        // console.log(response.data.data[0].author.username);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);
  const showPosts = data.map((item, index) => (
    <Post key={index} cardDetails={item} />
  ));

  //   loading && <>....looding</>;
  return <div>{showPosts}</div>;
}
