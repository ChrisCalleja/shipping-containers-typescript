import {
  findContainersByDestination,
  findOverweightTransporters,
  isSafeToAddContainer,
} from "../src/functions";
import { HeavyContainer } from "../src/HeavyContainer";
import { LightContainer } from "../src/LightContainer";
import ShippingContainer from "../src/models/ShippingContainer";
import Transporter from "../src/models/Transporter";
import Ship from "../src/Ship";
import { Truck } from "../src/Trucker";

describe("findContainersByDestination function", () => {
  test("Do a test case with an array of LightContainer.", () => {
    const shippingContainers: ShippingContainer[] = [
      new LightContainer("Detroit"),
    ];
    expect(findContainersByDestination(shippingContainers, "Detroit")).toEqual([
      { destination: "Detroit", cargoWeight: 0 },
    ]);
  });
  test("Do a test case with an array that has a mix of LightContainer and HeavyContainer.", () => {
    const shippingContainers: ShippingContainer[] = [
      new LightContainer("Detroit"),
      new HeavyContainer(50, "Miami"),
      new HeavyContainer(50, "Detroit", 1000),
    ];
    expect(findContainersByDestination(shippingContainers, "Detroit")).toEqual([
      { destination: "Detroit", cargoWeight: 0 },
      { tareWeight: 50, destination: "Detroit", cargoWeight: 1000 },
    ]);
  });
  test("Do a test case where none of the containers match the destination. (Expect an empty array as the result.)", () => {
    const shippingContainers: ShippingContainer[] = [
      new LightContainer("Detroit"),
      new HeavyContainer(50, "Miami"),
      new HeavyContainer(50, "Detroit", 1000),
    ];
    expect(findContainersByDestination(shippingContainers, "New York")).toEqual(
      []
    );
  });
  test("Do a test case with an empty array. (Expect an empty array as the result.)", () => {
    const shippingContainers: ShippingContainer[] = [];
    expect(findContainersByDestination(shippingContainers, "New York")).toEqual(
      []
    );
  });
});

describe("findOverweightTransporters function", () => {
  test("Do a test case with an array of Trucks, some overweight, some not", () => {
    const truck1: Truck = new Truck(100);
    truck1.addContainer(new LightContainer("Detroit", 50));
    const truck2: Truck = new Truck(100);
    truck2.addContainer(new HeavyContainer(50, "Detroit", 100));
    const arrayOfTrucks: Transporter[] = [truck1, truck2];
    expect(findOverweightTransporters(arrayOfTrucks)).toEqual([truck2]);
  });
  test("Do a test case with an array that has a mix of Truck and Ship, some overweight, some not.", () => {
    const truck1: Truck = new Truck(100);
    truck1.addContainer(new LightContainer("Detroit", 50));
    const truck2: Truck = new Truck(100);
    truck2.addContainer(new HeavyContainer(50, "Detroit", 100));
    const ship: Ship = new Ship(100);
    ship.addContainer(new LightContainer("Miami", 200));
    const arrayOfTransporters: Transporter[] = [truck1, truck2, ship];
    expect(findOverweightTransporters(arrayOfTransporters)).toEqual([
      truck2,
      ship,
    ]);
  });
  test("Do a test case with an array of Transporters where none are overweight. (Expect an empty array as the result.)", () => {
    const truck1: Truck = new Truck(100);
    truck1.addContainer(new LightContainer("Detroit", 50));
    const truck2: Truck = new Truck(200);
    truck2.addContainer(new HeavyContainer(50, "Detroit", 100));
    const ship: Ship = new Ship(100);
    ship.addContainer(new LightContainer("Miami", 50));
    const arrayOfTransporters: Transporter[] = [truck1, truck2, ship];
    expect(findOverweightTransporters(arrayOfTransporters)).toEqual([]);
  });
  test("Do a test case with an array of Transporters where none are overweight. (Expect an empty array as the result.)", () => {
    const arrayOfTransporters: Transporter[] = [];
    expect(findOverweightTransporters(arrayOfTransporters)).toEqual([]);
  });
});

describe("isSafeToAddContainer function", () => {
  test("isSafeToAddContainer returns true for an empty ship and empty LightContainer when transporter maxWeight is 5000.", () => {
    const ship: Ship = new Ship(5000);
    const container: ShippingContainer = new LightContainer("Detroit");
    expect(isSafeToAddContainer(ship, container)).toBe(true);
  });
  test("isSafeToAddContainer returns true for an empty ship and a LightContainer with some cargo, but less than maxWeight.", () => {
    const ship: Ship = new Ship(5000);
    const container: ShippingContainer = new LightContainer("Detroit", 3000);
    expect(isSafeToAddContainer(ship, container)).toBe(true);
  });
  test("isSafeToAddContainer returns true for an empty ship and a HeavyContainer with some cargo, but less than maxWeight", () => {
    const ship: Ship = new Ship(5000);
    const container: ShippingContainer = new HeavyContainer(
      10,
      "Detroit",
      3000
    );
    expect(isSafeToAddContainer(ship, container)).toBe(true);
  });
  test("isSafeToAddContainer returns false for an empty ship and a LightContainer with some cargo, more than maxWeight.", () => {
    const ship: Ship = new Ship(5000);
    const container: ShippingContainer = new LightContainer("Detroit", 6000);
    expect(isSafeToAddContainer(ship, container)).toBe(false);
  });
  test("isSafeToAddContainer returns false for an empty ship and a HeavyContainer with some cargo, more than maxWeight.", () => {
    const ship: Ship = new Ship(5000);
    const container: ShippingContainer = new HeavyContainer(
      50,
      "Detroit",
      6000
    );
    expect(isSafeToAddContainer(ship, container)).toBe(false);
  });
  test("isSafeToAddContainer returns true for an empty ship and a container with the same gross weight as the maxWeight.", () => {
    const ship: Ship = new Ship(5000);
    const container: ShippingContainer = new HeavyContainer(
      50,
      "Detroit",
      4950
    );
    expect(isSafeToAddContainer(ship, container)).toBe(true);
  });
  test("Create a ship with one or more containers already added. isSafeToAddContainer returns true for a container that is light enough to be added to this ship.", () => {
    const ship: Ship = new Ship(5000);
    const ship1: Ship = new Ship(5000);
    ship1.addContainer(new LightContainer("Detroit", 50));
    const container: ShippingContainer = new HeavyContainer(
      50,
      "Detroit",
      3000
    );
    expect(isSafeToAddContainer(ship1, container)).toBe(true);
  });
  test("Create a ship with one or more containers already added. isSafeToAddContainer returns true for a container that is light enough to be added to this ship.", () => {
    const ship: Ship = new Ship(5000);
    const ship1: Ship = new Ship(50);
    ship1.addContainer(new LightContainer("Detroit", 50));
    const container: ShippingContainer = new HeavyContainer(
      50,
      "Detroit",
      3000
    );
    expect(isSafeToAddContainer(ship1, container)).toBe(false);
  });
});
