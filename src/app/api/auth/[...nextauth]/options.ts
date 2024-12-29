
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.email },
              { username: credentials.password },
            ],
          });
          if (!user) {
            throw new Error('No user found with this email');
          }
          if (!user.isVarified) {
            throw new Error('Please verify your account before logging in');
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          // console.log(isPasswordCorrect)
          if (isPasswordCorrect) {
            // console.log(user);
            return user;
          } else {
            throw new Error('Incorrect password');
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],

  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log('user',user,'account',account,'Profile',profile)
      await dbConnect();
      const existingUser = await UserModel.findOne({ email: user.email });
      if (!existingUser) {
        await UserModel.updateOne(
          { email: user.email },
          {
            $set: {
              isVarified: profile?.email_verified || false,
              email: user.email,
              image: user.image || "",
              name: user.name || "Anonymous",
              username: user.email?.split("@")[0].replace(/[^a-zA-Z0-9_]/g, ""),
            },
          },
          { upsert: true }
        );
      }
        
      
      return true;
    },

    async jwt({ token, user }) {
      // console.log(token)
      // console.log(user)
      if (user) {
        
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.username = user.username;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token, user }) {
      await dbConnect();
      const email = session.user.email;
      const userData = await UserModel.findOne({ email });
      if (token) {
        session.user._id = token._id || userData?._id;
        session.user.isVerified = token.isVerified || userData?.isVarified;
        session.user.username = token.username || userData?.username;
        session.user.name = token.name || userData?.name;
        session.user.image=userData?.image||''
      }
      // console.log(session)
      return session;
    },
  },
};