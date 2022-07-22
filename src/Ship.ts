import ShippingContainer from "./models/ShippingContainer";
import Transporter from "./models/Transporter";

export default class Ship implements Transporter {
  maxWeight: number;
  containers: ShippingContainer[] = [];
  constructor(maxWeight: number) {
    this.maxWeight = maxWeight;
  }
  addContainer(container: ShippingContainer): void {
    this.containers.push(container);
  }
  getTotalWeight(): number {
    let sum: number = 0;
    if (!this.containers) {
      return 0;
    } else {
      this.containers.forEach((containers) => {
        sum += containers.getGrossWeight();
      });
      return sum;
    }
  }
  isOverweight(): boolean {
    if (this.getTotalWeight() > this.maxWeight) {
      return true;
    } else {
      return false;
    }
  }
}
