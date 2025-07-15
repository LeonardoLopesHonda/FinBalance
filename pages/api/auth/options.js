import GitHubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import user from "models/user";
import password from "models/password";

export const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "SeuUsername",
        },
        email: {
          label: "Email:",
          type: "text",
          placeholder: "Seuemail@gmail.com",
        },
        password: {
          label: "Senha:",
          type: "password",
        },
      },
      async authorize(credentials) {
        const loggedUser = await user.findOneByEmail(credentials.email);
        if (!user) return null;

        const isValidPassword = await password.compare(
          credentials.password,
          loggedUser.password,
        );
        if (!isValidPassword) return null;

        return {
          id: loggedUser.id,
          username: loggedUser.username,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, anonymous_user, account }) {
      if (anonymous_user && account?.provider !== "credentials") {
        const existing = await user.findOneByEmail(anonymous_user.email);
        if (!existing) {
          const newUser = await user.create({
            username: anonymous_user.username,
            email: anonymous_user.email,
            password: anonymous_user.password,
            oauth: account.provider,
          });
          token.id = newUser.id;
        } else {
          token.id = existing.id;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;

      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  logger: {
    error(code, metadata) {
      console.error("NextAuth error:", code, metadata);
    },
    warn: console.warn,
    debug: console.log,
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 12 * 60 * 60,
  },
};
