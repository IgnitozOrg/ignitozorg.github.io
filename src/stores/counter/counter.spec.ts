import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { useCounterStore } from "./counter";

describe("useCounterStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("increments count and exposes the doubled value", () => {
    const counter = useCounterStore();

    counter.increment();

    expect(counter.count).toBe(1);
    expect(counter.doubleCount).toBe(2);
  });
});
