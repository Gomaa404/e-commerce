import NextAuth from "next-auth";
import { authOptions } from "@/app/auth";

// Re-export NextAuth handler for both GET and POST requests.
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
