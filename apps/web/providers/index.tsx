"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import React from "react";
import CacheProvider from "react-inlinesvg/provider";

import { WebPushProvider } from "@calcom/features/notifications/WebPushContext";

import useIsBookingPage from "@lib/hooks/useIsBookingPage";
import PlainChat from "@lib/plain/dynamicProvider";

import type { AppRouterI18nProviderProps } from "./i18n";
import { AppRouterI18nProvider } from "./i18n";
import { queryClient } from "./qeury-client";
import { trpc, trpcClient } from "./trpc";

export function AppProvider({ children, translations, locale, ns }: AppRouterI18nProviderProps): JSX.Element {
  // NOTE: we have moved to `typescript ^V5` and will this was not the issue, the issue was in the `react-inlinesvg` package
  // hence it's type is totally different than what we have in react 19 and it's not supported so we have to cast it
  const CCacheProvider = CacheProvider as React.ElementType;
  const isBookingPage = useIsBookingPage();

  return (
    <SessionProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {!isBookingPage ? <PlainChat /> : null}
          <CCacheProvider>
            <WebPushProvider>
              <AppRouterI18nProvider translations={translations} locale={locale} ns={ns}>
                {children}
              </AppRouterI18nProvider>
            </WebPushProvider>
          </CCacheProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </SessionProvider>
  );
}
