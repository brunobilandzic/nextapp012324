import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../lib/db/mongoDb";
import { getOrCreateUser } from "../../../lib/auth";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.JWT_KEY,
  },
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn({ user }) {
      console.log("in callback: ", user);
      return await getOrCreateUser(user);
    },
  },
};

export default NextAuth(authOptions);
