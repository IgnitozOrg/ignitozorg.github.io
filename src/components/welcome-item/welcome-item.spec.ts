import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import WelcomeItem from "./welcome-item.vue";

describe("WelcomeItem", () => {
  it("renders icon, heading, and default content slots", () => {
    const wrapper = mount(WelcomeItem, {
      slots: {
        icon: "<span>Icon</span>",
        heading: "Heading",
        default: "Body content",
      },
    });

    expect(wrapper.find("i").text()).toBe("Icon");
    expect(wrapper.find("h3").text()).toBe("Heading");
    expect(wrapper.text()).toContain("Body content");
  });
});
