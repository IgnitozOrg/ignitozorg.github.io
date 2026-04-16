import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import IconCommunity from "./icon-community.vue";

describe("IconCommunity", () => {
  it("renders an accessible-hidden svg", () => {
    const wrapper = mount(IconCommunity);

    expect(wrapper.find("svg").attributes("aria-hidden")).toBe("true");
  });
});
