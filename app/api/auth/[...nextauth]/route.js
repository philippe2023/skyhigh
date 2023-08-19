import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import SqliteDBAdapter from "../../../_utils/nextauth_sqlite_adapter";

export const authOptions = {
    providers: [
      Auth0Provider({
          clientId: process.env.AUTH0_CLIENT_ID,
          clientSecret: process.env.AUTH0_CLIENT_SECRET,
          issuer: process.env.AUTH0_ISSUER
      }),
    ],
    adapter: SqliteDBAdapter(),
  };
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };