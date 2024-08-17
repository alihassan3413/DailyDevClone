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
import { CHECK_CREDENTIALS_URL, LOGIN_URL } from "@/lib/apiEndpoint";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

function Login() {
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: [],
    password: [],
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    myAxios
      .post(CHECK_CREDENTIALS_URL, authState)
      .then((res) => {
        const response = res.data;
        setLoading(false);
        if (response.message === "Credentials are matched") {
          signIn("credentials", {
            email: authState.email,
            password: authState.password,
            redirect: true,
            callbackUrl: "/",
          });

          toast.success("Logged in successfully");
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors);
        } else if (err.response?.status === 401) {
          toast.error("Wrong Password");
        } else if (err.response?.status === 404) {
          toast.error("User does not exist!");
        } else {
          toast.error("Something went wrong.Please try again!");
        }
      });
  };
  return (
    <div>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Welcome to Daily.dev</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form action="" className="space-y-4" onSubmit={handleSubmit}>
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
                  id="password"
                  type="password"
                  value={authState.password}
                  placeholder="Enter your password"
                  onChange={(e) =>
                    setAuthState({ ...authState, password: e.target.value })
                  }
                />
                <span className="text-red-500 italic">{errors.password}</span>
              </div>

              <div className="mt-2">
                <Button disabled={loading} className="w-full">
                  {loading ? "Processing" : "Login"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
}

export default Login;
