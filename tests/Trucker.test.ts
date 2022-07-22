import { HeavyContainer } from "../src/HeavyContainer";
import { LightContainer } from "../src/LightContainer";
import { Truck } from "../src/Trucker";

describe("Trucker class", () => {
  test("The maxWeight property is set from the constructor parameter.", () => {
    const truck: Truck = new Truck(1000);
    expect(truck.maxWeight).toBe(1000);
  });
  test("The container property is set to null in a new Truck instance.", () => {
    const truck: Truck = new Truck(1000);
    expect(truck.container).toBe(null);
  });
  test("Calling addContainer sets the container property.", () => {
    const truck: Truck = new Truck(1000);
    truck.addContainer(new HeavyContainer(10, "Detroit", 1000));
    expect(truck.container).toEqual({
      tareWeight: 10,
      destination: "Detroit",
      cargoWeight: 1000,
    });
  });
  test("getTotalWeight returns the gross weight of the container when a container is added.", () => {
    const truck: Truck = new Truck(1000);
    truck.addContainer(new HeavyContainer(10, "Detroit", 1000));
    expect(truck.getTotalWeight()).toBe(1010);
  });
  test("getTotalWeight returns the gross weight of the container when a container is added.", () => {
    const truck: Truck = new Truck(1000);
    truck.addContainer(new LightContainer("Miami", 1000));
    expect(truck.getTotalWeight()).toBe(1000);
  });
  test("getTotalWeight returns 0 when container is null", () => {
    const truck: Truck = new Truck(1000);
    expect(truck.getTotalWeight()).toBe(0);
  });
  test("isOverweight returns true when the total weight is greater than maxWeight", () => {
    const truck: Truck = new Truck(1000);
    truck.addContainer(new HeavyContainer(10, "Detroit", 10000));
    expect(truck.isOverweight()).toBe(true);
  });
  test("isOverweight returns false when the total weight is less than maxWeight.", () => {
    const truck: Truck = new Truck(1000);
    truck.addContainer(new HeavyContainer(10, "Detroit", 500));
    expect(truck.isOverweight()).toBe(false);
  });
  test("isOverweight returns false when the total weight is less than maxWeight.", () => {
    const truck: Truck = new Truck(1000);
    truck.addContainer(new HeavyContainer(10, "Detroit", 990));
    expect(truck.isOverweight()).toBe(false);
  });
});
