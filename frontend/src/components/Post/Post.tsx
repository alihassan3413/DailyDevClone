"use client";
import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { laraEcho, privatelaraEcho } from "@/lib/echo.config";
import { useImmer } from "use-immer";
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";

function Post({
  data,
  user,
}: {
  data: ApiResponse<PostStateType>;
  user: CustomUser;
}) {
  const [posts, setPosts] = useImmer<ApiResponse<PostStateType>>(data);

  useEffect(() => {
    laraEcho
      .channel("post-broadcast")
      .listen("PostBroadCastEvent", (event: any) => {
        console.log("The real time data is", event?.post);

        const post: PostStateType = event.post;
        setPosts((prevState) => {
          prevState.data = [post, ...prevState.data];
        });
      });

    return () => {
      laraEcho.leave(`post-broadcast`);
    };
  }, []);
  return (
    <div className="pt-4 pl-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {posts.data &&
        posts.data.length > 0 &&
        posts.data.map((item, index) => <PostCard post={item} key={index} />)}
    </div>
  );
}

export default Post;

// const pvtLara = privatelaraEcho(user.token!);
// pvtLara
//   .private(`App.Models.User.${user.id}`)
//   .listen("TestEvvent", (event: any) => {
//     console.log("The private real time data is ", event);
//   });
