"use client";

import DefaultProvider from "../defaultContext";
import { SessionProvider } from "next-auth/react";
import { TabProvider } from "../tabContext";



export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <DefaultProvider>
        <TabProvider>
          {children}
        </TabProvider>
      </DefaultProvider>
  )
}