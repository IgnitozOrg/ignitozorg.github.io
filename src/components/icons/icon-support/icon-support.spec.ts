import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import IconSupport from "./icon-support.vue";

describe("IconSupport", () => {
  it("renders an accessible-hidden svg", () => {
    const wrapper = mount(IconSupport);

    expect(wrapper.find("svg").attributes("aria-hidden")).toBe("true");
  });
});
