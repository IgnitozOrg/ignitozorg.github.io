import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import AboutPage from "./about-page.vue";

describe("AboutPage", () => {
  it("renders the about heading", () => {
    const wrapper = mount(AboutPage);

    expect(wrapper.find("h1").text()).toBe("About page");
  });
});
