import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import ProjectsProvider from "@/context/ProjectsProvider";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient();

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ProjectsProvider>
          <SkeletonTheme baseColor="#303030" highlightColor="#3d3d3d">
            <Component {...pageProps} />
          </SkeletonTheme>
        </ProjectsProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
