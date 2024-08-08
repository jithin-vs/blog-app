import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";



export const authOptions = {
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
            return { id: user._id, name: user.name,username:user.username ,email: user.email };  
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
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username; 
      }
      return token;
    },
    async session({ session, token }) {

      if (token) {
        session.user.username = token.username; 
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
