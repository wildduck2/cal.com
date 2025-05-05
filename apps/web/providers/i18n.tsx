import React from "react";

/** Context for providing internationalization (i18n) data for app router-based pages. */
export type AppRouterI18nContextType = {
  /** Locale-specific translations for the current namespace. */
  translations: Record<string, string>;
  /** The current namespace. */
  ns: string;
  /** The current locale. */
  locale: string;
};

/** Props for the AppRouterI18nProvider component. */
export type AppRouterI18nProviderProps = AppRouterI18nContextType & {
  children: React.ReactNode;
};

/**
 * Context for providing internationalization (i18n) data for app router-based pages.
 *
 * This includes locale-specific translations, namespace context, and the current locale.
 */
export const AppRouterI18nContext = React.createContext<AppRouterI18nContextType | null>(null);

/**
 * AppRouterI18nProvider wraps part of the React tree and injects i18n data
 * for use with localized routing in Next.js App Router.
 *
 * This provider ensures that:
 * - `translations` for the current namespace are accessible
 * - the active `locale` is known
 * - the `ns` (namespace) indicates the current logical translation scope
 *
 * The context value is memoized to avoid unnecessary re-renders when only `locale` or `ns` change.
 *
 * @param {AppRouterI18nProviderProps} props
 * @param {ReactNode} props.children - The children components that need access to i18n context.
 * @param {Record<string, string>} props.translations - A flat key-value map of translations for the current namespace.
 * @param {string} props.locale - The currently active locale (e.g., "en", "ar").
 * @param {string} props.ns - The namespace indicating which translation set is being used (e.g., "home", "product").
 *
 * @returns {React.JSX.Element} A provider that supplies i18n context to its children.
 */
export function AppRouterI18nProvider({
  children,
  translations,
  locale,
  ns,
}: AppRouterI18nProviderProps): JSX.Element {
  const value = React.useMemo(
    () => ({
      translations,
      locale,
      ns,
    }),
    [locale, ns]
  );

  return <AppRouterI18nContext.Provider value={value}>{children}</AppRouterI18nContext.Provider>;
}
