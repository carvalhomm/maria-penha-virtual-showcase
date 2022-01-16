import { Stepper } from "./stepper.interface";

export interface SlideEvent {
  next?: number;
  previous?: number;
  stepper?: Stepper;
  changeStepper: boolean;
  hideStepper?: boolean;
}
