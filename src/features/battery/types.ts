export interface BaseChargeState {
  internalEventId: number;
  chargingLevel: number;
  date: string;
}

type Direction = 'up' | 'down' | 'same';

export interface ChargeState extends BaseChargeState {
  direction: Direction;
}
