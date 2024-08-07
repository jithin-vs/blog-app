import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials;
        await connectDB();
        try {
          const user = await User.findOne({ username: username });
          if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) return null;
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy:"jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn:'/login'
  }
});

export { handler as GET, handler as POST };
