import { getServerSession } from "next-auth";
import {
  authOptions,
  CustomSession,
} from "../api/auth/[...nextauth]/authOptions";
import fetchPosts from "@/dataFetch/postFetch";
import Post from "@/components/Post/Post";

async function App() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const posts: ApiResponse<PostStateType> = await fetchPosts(
    session?.user?.token!
  );
  return (
    <div>
      <Post data={posts} user={session?.user!} />
    </div>
  );
}

export default App;
