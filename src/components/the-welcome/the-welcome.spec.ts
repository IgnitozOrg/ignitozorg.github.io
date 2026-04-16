import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import TheWelcome from "./the-welcome.vue";

describe("TheWelcome", () => {
  it("renders the default Vue resource sections", () => {
    const wrapper = mount(TheWelcome);

    expect(wrapper.text()).toContain("Documentation");
    expect(wrapper.text()).toContain("Tooling");
    expect(wrapper.text()).toContain("Ecosystem");
    expect(wrapper.text()).toContain("Community");
    expect(wrapper.text()).toContain("Support Vue");
  });
});
