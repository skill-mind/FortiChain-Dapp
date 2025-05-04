"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import { auth0Config } from "@/lib/auth0Config";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export function Auth0ProviderWithRedirect({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Add logging to see configuration on load
  useEffect(() => {
    console.log("Auth0 Provider Configuration:", {
      domain: auth0Config.domain,
      clientId: auth0Config.clientId,
      redirectUri: auth0Config.redirectUri,
      scope: auth0Config.scope
    });
  }, []);

  // Handle the redirect callback from Auth0
  const onRedirectCallback = (appState: any) => {
    console.log("Auth0 redirect callback triggered with appState:", appState);
    // Use the router to redirect after login
    router.replace(appState?.returnTo || "/dashboard/project-owner/projects/register-project");
  };

  return (
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={{
        redirect_uri: auth0Config.redirectUri,
        scope: auth0Config.scope,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
} 