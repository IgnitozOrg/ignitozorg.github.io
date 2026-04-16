import { describe, expect, it, vi } from "vitest";

const appMocks = vi.hoisted(() => {
  const app = {
    mount: vi.fn(),
    use: vi.fn(() => app),
  };

  return {
    app,
    appComponent: { name: "App" },
    createApp: vi.fn(() => app),
    createPinia: vi.fn(() => "pinia"),
    router: { name: "router" },
  };
});

vi.mock("vue", () => ({
  createApp: appMocks.createApp,
}));

vi.mock("pinia", () => ({
  createPinia: appMocks.createPinia,
}));

vi.mock("./router", () => ({
  default: appMocks.router,
}));

vi.mock("./App.vue", () => ({
  default: appMocks.appComponent,
}));

describe("main", () => {
  it("creates the Vue app, installs plugins, and mounts it", async () => {
    await import("./main");

    expect(appMocks.createApp).toHaveBeenCalledWith(appMocks.appComponent);
    expect(appMocks.createPinia).toHaveBeenCalledOnce();
    expect(appMocks.app.use).toHaveBeenCalledWith("pinia");
    expect(appMocks.app.use).toHaveBeenCalledWith(appMocks.router);
    expect(appMocks.app.mount).toHaveBeenCalledWith("#app");
  });
});
