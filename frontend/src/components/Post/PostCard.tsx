import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserAvatar from "../common/UserAvatr";
import Image from "next/image";
import { ArrowBigUp, LinkIcon, MessageSquare } from "lucide-react";
import { toast } from "react-toastify";

function PostCard({ post }: { post: PostStateType }) {
  const formattedOptions = (date: string) => {
    const options: object = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: true,
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(post.url);
    toast.success("Link copied successfully");
  };
  return (
    <div>
      <Card className="w-[300px] h-[500px] bg-muted">
        <CardHeader>
          <UserAvatar image={post.user.profile_image} />
          <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-2 px-2">
            {formattedOptions(post.created_at)}
          </p>
          <figure>
            <Image
              src={post.image_url}
              width={250}
              height={250}
              className="w-full h-40 object-cover rounded-lg"
              alt="Post image"
            />
          </figure>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <ArrowBigUp size={25} />
          <div className="flex space-x-2 items-center">
            <MessageSquare size={20} />
            {post.comment_count > 0 && <span>{post.comment_count}</span>}
          </div>
          <LinkIcon
            className="cursor-pointer"
            size={20}
            onClick={() => copyUrl()}
          />
        </CardFooter>
      </Card>
    </div>
  );
}

export default PostCard;
