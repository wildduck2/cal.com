import { _generateMetadata } from "app/_utils";
import { createRouterCaller } from "providers/trpc/trpc.context";

import { APP_NAME } from "@calcom/lib/constants";
import { apiKeysRouter } from "@calcom/trpc/server/routers/viewer/apiKeys/_router";

import ApiKeysView from "~/settings/developer/api-keys-view";

export const generateMetadata = async () =>
  await _generateMetadata(
    (t) => t("api_keys"),
    (t) => t("create_first_api_key_description", { appName: APP_NAME }),
    undefined,
    undefined,
    "/settings/developer/api-keys"
  );

const Page = async () => {
  const caller = await createRouterCaller(apiKeysRouter);
  const apiKeys = await caller.list();
  return <ApiKeysView apiKeys={apiKeys} />;
};

export default Page;
