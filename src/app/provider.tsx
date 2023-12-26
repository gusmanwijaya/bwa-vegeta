"use client";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import { SessionProvider } from "next-auth/react";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </SessionProvider>
  );
}

export default Provider;
