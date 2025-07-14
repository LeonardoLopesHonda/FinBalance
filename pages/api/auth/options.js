import GitHubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";

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
        const res = await fetch("/api/v1/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const user = await res.json();

        if (
          credentials?.username === user.username &&
          credentials?.email === user.email &&
          credentials?.password === user.password
        ) {
          return user;
        }

        return null;
      },
    }),
  ],
};
