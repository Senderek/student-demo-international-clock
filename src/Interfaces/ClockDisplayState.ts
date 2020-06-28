import { Moment } from "moment";

import moment from "moment";

interface ClockDisplayState {
  now: moment.Moment;
  hour: number;
  minute: number;
  second: number;
}
export default ClockDisplayState;
