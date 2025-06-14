"use client";

import { ReactNode } from "react";
import Layout from "@/components/Layout";
import ThemeProvider from "@/components/ThemeProvider";
import { ToastProvider } from "@/hooks/use-toast";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Layout>{children}</Layout>
      </ToastProvider>
    </ThemeProvider>
  );
}
