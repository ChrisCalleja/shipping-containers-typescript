import { HeavyContainer } from "../src/HeavyContainer";
import { LightContainer } from "../src/LightContainer";
import Ship from "../src/Ship";

describe("Ship class", () => {
  test("The maxWeight property is set from the constructor parameter.", () => {
    const ship: Ship = new Ship(10000);
    expect(ship.maxWeight).toBe(10000);
  });
  test("The containers property is set to an empty array in a new Ship instance.", () => {
    const ship: Ship = new Ship(10000);
    expect(ship.containers).toEqual([]);
  });
  test("Calling addContainer adds to the containers array property.", () => {
    const ship: Ship = new Ship(10000);
    ship.addContainer(new LightContainer("Detroit"));
    expect(ship.containers).toEqual([
      { destination: "Detroit", cargoWeight: 0 },
    ]);
  });
  test("Calling addContainer twice adds both containers to the containers array property.", () => {
    const ship: Ship = new Ship(10000);
    ship.addContainer(new LightContainer("Detroit"));
    ship.addContainer(new LightContainer("Detroit"));
    expect(ship.containers).toEqual([
      { destination: "Detroit", cargoWeight: 0 },
      { destination: "Detroit", cargoWeight: 0 },
    ]);
  });
  test("getTotalWeight returns the combined gross weight of the containers in the array.", () => {
    const ship: Ship = new Ship(10000);
    ship.addContainer(new LightContainer("Detroit", 50));
    ship.addContainer(new LightContainer("Detroit", 100));
    expect(ship.getTotalWeight()).toBe(150);
  });
  test("getTotalWeight returns 0 when containers is empty.", () => {
    const ship: Ship = new Ship(10000);
    expect(ship.getTotalWeight()).toBe(0);
  });
  test("isOverweight returns true when the total weight is greater than maxWeight", () => {
    const ship: Ship = new Ship(10000);
    ship.addContainer(new LightContainer("Detroit", 10001));
    expect(ship.isOverweight()).toBe(true);
  });
  test("isOverweight returns false when the total weight is less than maxWeight", () => {
    const ship: Ship = new Ship(10000);
    ship.addContainer(new LightContainer("Detroit", 9999));
    expect(ship.isOverweight()).toBe(false);
  });
  test("isOverweight returns false when the total weight is equal to maxWeight", () => {
    const ship: Ship = new Ship(10000);
    ship.addContainer(new LightContainer("Detroit", 10000));
    expect(ship.isOverweight()).toBe(false);
  });
});
