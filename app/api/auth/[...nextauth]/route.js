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
        const { email, password } = credentials;
        await connectDB();
        try {
          const user = await User.findOne({ email: email });
          if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) return null;
            return { id: user._id, name: user.name, email: user.email };  
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
        token.profilePic = user.profilePic || process.env.PROFILE_PATH; 
      }
      return token;
    },
    async session({ session, token }) {

      if (token) {
        session.user.email = token.email; 
        session.user.profilePic = token.profilePic;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, handler as DELETE, handler as PUT };

