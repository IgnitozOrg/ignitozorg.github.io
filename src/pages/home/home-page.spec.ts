import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import HomePage from "./home-page.vue";

describe("HomePage", () => {
  it("renders the landing message and primary YouTube actions", () => {
    const wrapper = mount(HomePage, {
      global: {
        stubs: {
          BaseButton: {
            props: ["href"],
            template: '<a class="base-button-stub" :href="href"><slot /></a>',
          },
          LatestVideosSection: {
            template: '<section class="latest-videos-section-stub" />',
          },
        },
      },
    });

    const links = wrapper.findAll("a.base-button-stub");

    expect(wrapper.text()).toContain("IA, herramientas, código, modelos e innovación");
    expect(wrapper.find(".latest-videos-section-stub").exists()).toBe(true);
    expect(links.map((link) => link.attributes("href"))).toEqual([
      "https://www.youtube.com/@Ignitoz?sub_confirmation=1",
      "https://www.youtube.com/@Ignitoz",
    ]);
  });
});
