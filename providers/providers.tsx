"use client";

import HomePageProvider from "@/components/home/home.provider";
import { WorkProvider } from "@/components/work/work.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HomePageProvider>
        <WorkProvider>{children}</WorkProvider>
      </HomePageProvider>
    </QueryClientProvider>
  );
}
