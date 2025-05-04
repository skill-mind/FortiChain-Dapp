export const auth0Config = {
    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN!,
    clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!,
    redirectUri: typeof window !== "undefined" ? process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI : "",
    scope: process.env.NEXT_PUBLIC_AUTH0_SCOPE,
  };
  