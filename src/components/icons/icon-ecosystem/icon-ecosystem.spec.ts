import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import IconEcosystem from "./icon-ecosystem.vue";

describe("IconEcosystem", () => {
  it("renders an accessible-hidden svg", () => {
    const wrapper = mount(IconEcosystem);

    expect(wrapper.find("svg").attributes("aria-hidden")).toBe("true");
  });
});
