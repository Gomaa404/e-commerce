import "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    name?: string;
    email?: string;
    token?: string;
    role?: string;
  }

  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      token?: string;
      role?: string;
      address?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    token?: string;
    role?: string;
  }
}
