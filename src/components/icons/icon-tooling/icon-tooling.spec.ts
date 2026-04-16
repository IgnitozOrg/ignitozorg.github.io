import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import IconTooling from "./icon-tooling.vue";

describe("IconTooling", () => {
  it("renders an accessible-hidden svg", () => {
    const wrapper = mount(IconTooling);

    expect(wrapper.find("svg").attributes("aria-hidden")).toBe("true");
  });
});
