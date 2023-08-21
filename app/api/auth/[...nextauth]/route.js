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
    callbacks: {
      async session({ session, user }) {
        if (session?.user) {
          session.user.id = user.id;
          session.user.firstName = user.firstName;
          session.user.lastName = user.lastName;
        }
        return session;
      },
    },
    adapter: SqliteDBAdapter(),
  };
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };