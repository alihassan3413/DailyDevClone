import { LOGIN_URL } from "@/lib/apiEndpoint";
import myAxios from "@/lib/axios.config";
import { AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}

export type CustomUser = {
  id?: string | null;
  name?: string | null;
  username?: string | null;
  email?: string | null;
  profile_image?: string | null;
  token?: string | null;
  created_at?: string | null;
};

export const authOptions = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.profile_image) {
        const user: CustomUser = token.user as CustomUser;
        user.profile_image = session?.profile_image;
      }
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({
      session,
      token,
      user,
    }: {
      session: CustomSession;
      token: JWT;
      user: CustomUser;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        try {
          const res = await myAxios.post(LOGIN_URL, credentials);
          const response = res.data;
          const user = response.data;

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      },
    }),
  ],
};
