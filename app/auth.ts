import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/auth/error",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const res = await fetch(
            "https://ecommerce.routemisr.com/api/v1/auth/signin",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Authentication failed");
          }

          const data = await res.json();

          if (data.message !== "success") {
            throw new Error("Authentication failed");
          }

          const decoded: { id: string } = jwtDecode(data.token);

          return {
            id: decoded.id,
            name: data.user.name,
            email: data.user.email,
            image: data.user.image,
            token: data.token,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error("Authentication failed. Please try again.");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        const credentialsUser = user as unknown as {
          id?: string;
          name?: string;
          email?: string;
          image?: string;
          token?: string;
        };

        const t = token as unknown as Record<string, unknown>;

        if (credentialsUser?.token) t.accessToken = credentialsUser.token;
        if (credentialsUser?.id) token.sub = credentialsUser.id;
        if (credentialsUser?.name) token.name = credentialsUser.name;
        if (credentialsUser?.email) token.email = credentialsUser.email;
        if (credentialsUser?.image) token.picture = credentialsUser.image;

        return token;
      }

      return token;
    },
    async session({ session, token }) {
      const accessToken = (token as { accessToken?: string }).accessToken;
      session.user = {
        ...session.user,
        name: token.name ?? session.user?.name ?? null,
        email: token.email ?? session.user?.email ?? null,
        token: accessToken,
      };
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-dev-only",
  debug: process.env.NODE_ENV === 'development',
  logger: {
    error(code, metadata) {
      console.error({ code, metadata });
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
  events: {
    async signIn(message) {
      console.log('User signed in:', message.user?.email);
    },
    async signOut(message) {
      console.log('User signed out:', message.token?.email);
    },
  },
};

export default NextAuth(authOptions);
