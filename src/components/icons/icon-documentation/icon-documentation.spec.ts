import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import IconDocumentation from "./icon-documentation.vue";

describe("IconDocumentation", () => {
  it("renders an accessible-hidden svg", () => {
    const wrapper = mount(IconDocumentation);

    expect(wrapper.find("svg").attributes("aria-hidden")).toBe("true");
  });
});
