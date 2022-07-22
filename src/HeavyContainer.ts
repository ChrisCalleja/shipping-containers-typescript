import ShippingContainer from "./models/ShippingContainer";

export class HeavyContainer implements ShippingContainer {
  tareWeight: number;
  destination: string;
  cargoWeight: number;
  constructor(
    tareWeight: number,
    destination: string,
    cargoWeight: number = 0
  ) {
    this.tareWeight = tareWeight;
    this.destination = destination;
    this.cargoWeight = cargoWeight;
  }
  getGrossWeight(): number {
    return this.tareWeight + this.cargoWeight;
  }
}
