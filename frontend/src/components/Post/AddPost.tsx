"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link1Icon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import Image from "next/image";
import { isValid } from "@/lib/utils";
import axios from "axios";
import { toast } from "react-toastify";
import myAxios from "@/lib/axios.config";
import { POST_URL } from "@/lib/apiEndpoint";
import { useSession } from "next-auth/react";
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";

function AddPost() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data } = useSession();
  const user: CustomUser = data?.user as CustomUser;
  const [postState, setPostState] = useState<PostType>({
    url: "",
    image_url: "",
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    title: [],
    url: [],
    description: [],
  });

  const loadPreview = async () => {
    if (postState?.url && isValid(postState.url!)) {
      setLoading(true);
      axios
        .post("/api/image-preview", { url: postState.url })
        .then((res) => {
          setLoading(false);
          const response: ImagePreviewRes = res.data?.data;
          const image =
            response.images.length > 0
              ? response.images[0]
              : "https://images.unsplash.com/photo-1650692201357-3b1b15469952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

          setPostState({
            ...postState,
            image_url: image,
            title: response.title,
            description: response.description ?? "",
          });
          console.log(postState);
        })
        .catch((err) => {
          setLoading(false);
          toast.error("Something went wrong while fetching data");
        });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    myAxios
      .post(POST_URL, postState, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        if (res.status === 204) {
          toast.success("Post added successfully, but no content returned!");
        } else {
          const response = res.data;
          setOpen(false);
          setPostState({});
          toast.success("Post added successfully");
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors);
        } else {
          toast.error("Something went wrong. Please try again!");
        }
      });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div
            className="flex space-x-3 items-center mb-4 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Link1Icon className="w-5 h-5" />
            <p>Submit Article</p>
          </div>
        </DialogTrigger>
        <DialogContent
          className="overflow-y-scroll max-h-screen"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Add Post</DialogTitle>
            <form onSubmit={handleSubmit} className="space-y-3">
              {postState.image_url && (
                <Image
                  src={postState.image_url}
                  width={450}
                  height={450}
                  alt="image_url"
                  className="object-contain w-full rounded-xl my-2"
                />
              )}
              <div>
                <Label htmlFor="url">Url</Label>
                <Input
                  value={postState.url}
                  onChange={(e) =>
                    setPostState({ ...postState, url: e.target.value })
                  }
                  onBlur={() => loadPreview()}
                  type="text"
                  placeholder="Paste your url here"
                />
                <span className="text-red-500 italic">{errors.url?.[0]}</span>
              </div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  value={postState.title}
                  onChange={(e) =>
                    setPostState({ ...postState, title: e.target.value })
                  }
                  placeholder="Enter your post title"
                />
                <span className="text-red-500 italic">{errors.title?.[0]}</span>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  value={postState.description}
                  onChange={(e) =>
                    setPostState({ ...postState, description: e.target.value })
                  }
                  rows={10}
                  placeholder="Type your message here..."
                />
                <span className="text-red-500 italic">
                  {errors.description?.[0]}
                </span>
              </div>
              <div>
                <Label htmlFor="image_url">Image Url</Label>
                <Input
                  value={postState.image_url}
                  onChange={(e) =>
                    setPostState({ ...postState, url: e.target.value })
                  }
                  type="text"
                  placeholder="Paste your iamge url here"
                />
              </div>

              <div className="mt-4">
                <Button className="w-full" disabled={loading}>
                  {loading ? "Processing" : "Submit"}
                </Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddPost;
