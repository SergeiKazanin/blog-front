import React from "react";
import { useGetAllPostsQuery } from "./store/postApi";

function App() {
  const { data: posts, isFetching, isError } = useGetAllPostsQuery("");
  console.log(posts, isError);
  return (
    <div>
      {isFetching && <p>Loading</p>}
      <ul>
        {posts?.map((post) => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
