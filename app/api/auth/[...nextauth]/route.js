import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials;
        await connectDB();
        const user = User.findOne({ username: username });
        if (user) {
          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) return null;
          return user;
        } else {
          return null;
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
