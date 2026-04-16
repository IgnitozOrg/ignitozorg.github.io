import { describe, expect, it } from "vitest";
import router from "./index";

describe("router", () => {
  it("registers the home and about routes", () => {
    expect(router.hasRoute("home")).toBe(true);
    expect(router.hasRoute("about")).toBe(true);
    expect(router.resolve("/").name).toBe("home");
    expect(router.resolve("/about").name).toBe("about");
  });
});
