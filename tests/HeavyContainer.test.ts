import { HeavyContainer } from "../src/HeavyContainer";

describe("HeavyContainer class", () => {
  test("The tareWeight, destination, and cargoWeight properties are set from the constructor parameters", () => {
    const container: HeavyContainer = new HeavyContainer(10, "Detroit", 10);
    expect(container.tareWeight).toBe(10);
    expect(container.destination).toBe("Detroit");
    expect(container.cargoWeight).toBe(10);
  });
  test("cargoWeight defaults to 0, when the third constructor parameter is omitted.", () => {
    const container: HeavyContainer = new HeavyContainer(10, "Detroit");
    expect(container.cargoWeight).toBe(0);
  });
  test("getGrossWeight returns the tareWeight plus the cargoWeight (write 2 test cases with different tareWeights and cargoWeights)", () => {
    const container: HeavyContainer = new HeavyContainer(10, "Detroit", 10);
    expect(container.getGrossWeight()).toBe(20);
  });
});
