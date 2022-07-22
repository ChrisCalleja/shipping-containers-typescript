import { LightContainer } from "../src/LightContainer";
import ShippingContainer from "../src/models/ShippingContainer";

describe("LightContainer class", () => {
  test("The destination and cargoWeight properties are set from the constructor parameters.", () => {
    const container: LightContainer = new LightContainer("Detroit", 100000);
    expect(container.destination).toBe("Detroit");
    expect(container.cargoWeight).toBe(100000);
  });
  test("cargoWeight defaults to 0, when the second constructor parameter is omitted.", () => {
    const container: LightContainer = new LightContainer("Detroit");
    expect(container.cargoWeight).toBe(0);
  });
  test("getGrossWeight returns the cargoWeight (write 2 test cases with different cargoWeights)", () => {
    const container: LightContainer = new LightContainer("Detroit", 100);
    expect(container.getGrossWeight()).toBe(100);
  });
  test("getGrossWeight returns the cargoWeight (write 2 test cases with different cargoWeights)", () => {
    const container: LightContainer = new LightContainer("Detroit", 500);
    expect(container.getGrossWeight()).toBe(500);
  });
});
