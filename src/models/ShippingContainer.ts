export default interface ShippingContainer {
  destination: string;
  cargoWeight: number;
  getGrossWeight: () => number;
}
