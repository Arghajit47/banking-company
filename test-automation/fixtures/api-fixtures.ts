import { test as base } from "@playwright/test";
import { BackendApi } from "@pages/backend/api";

type Fixtures = {
  backendApi: BackendApi;
};

export const test = base.extend<Fixtures>({
  backendApi: async ({}, fixtureUse) => {
    const api = new BackendApi();
    await api.init();
    await fixtureUse(api);
    await api.dispose();
  },
});

export { expect } from "@playwright/test";
