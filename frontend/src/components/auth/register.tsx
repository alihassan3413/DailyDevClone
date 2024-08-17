"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import myAxios from "@/lib/axios.config";
import { REGISTER_URL } from "@/lib/apiEndpoint";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

function Register() {
  const [authState, setAuthState] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: [],
    email: [],
    password: [],
    username: [],
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    myAxios
      .post(REGISTER_URL, authState)
      .then((res) => {
        setLoading(false);
        toast.success("Account created successfully");
        signIn("credentials", {
          email: authState.email,
          password: authState.password,
          redirect: true,
          callbackUrl: "/",
        });
      })
      .catch((err) => {
        setLoading(false);
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors);
        } else {
          toast.error("Something went wrong.Please try again!");
        }
      });
  };
  return (
    <div>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Create your account and stay updated.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2" onSubmit={handleSubmit}>
            <form action="" className="space-y-1">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={authState.name}
                  type="text"
                  onChange={(e) =>
                    setAuthState({ ...authState, name: e.target.value })
                  }
                />
                <span className="text-red-500 italic">{errors.name}</span>
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={authState.username}
                  type="email"
                  onChange={(e) =>
                    setAuthState({ ...authState, username: e.target.value })
                  }
                />
                <span className="text-red-500 italic">{errors.username}</span>
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  value={authState.email}
                  type="email"
                  onChange={(e) =>
                    setAuthState({ ...authState, email: e.target.value })
                  }
                />
                <span className="text-red-500 italic">{errors.email}</span>
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id=""
                  type="password"
                  value={authState.password}
                  placeholder="Enter your password"
                  onChange={(e) =>
                    setAuthState({ ...authState, password: e.target.value })
                  }
                />
                <span className="text-red-500 italic">{errors.password}</span>
              </div>

              <div className="space-y-1">
                <Label htmlFor="password_confirmation">Confirm Password</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  value={authState.password_confirmation}
                  placeholder="Password Confirmation"
                  onChange={(e) =>
                    setAuthState({
                      ...authState,
                      password_confirmation: e.target.value,
                    })
                  }
                />
              </div>

              <div className="">
                <Button disabled={loading} className="w-full mt-2">
                  {loading ? "Processing" : "Register"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
}

export default Register;
