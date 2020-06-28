import React, { useState, Fragment } from "react";
import moment from "moment";
import momentTimezone from "moment-timezone";
import ClockDisplayState from "../Interfaces/ClockDisplayState";
import { useInterval } from "../Common/hooks";
import ClockDisplayProps from "../Interfaces/ClockDisplayProps";
import CancelIcon from "@material-ui/icons/Cancel";

import "../styles/clock.scss";
import IconButton from "@material-ui/core/IconButton";

const defualtState: ClockDisplayState = {
  now: moment(),
  hour: 0,
  minute: 0,
  second: 0,
};

const ClockDisplay = (props: ClockDisplayProps) => {
  const [clockState, setClockState] = useState(defualtState);

  const updateClock = () => {
    const now = momentTimezone.tz(moment(), props.timezone),
      second = now.seconds() * 6,
      minute = now.minutes() * 6 + second / 60,
      hour = ((now.hours() % 12) / 12) * 360 + 90 + minute / 12;

    setClockState({ now, hour, minute, second });
  };

  useInterval(updateClock, 1000);
  return (
    <Fragment>
      <div className="circle">
        <div className="face">
          <div
            id="hour"
            className="hour"
            style={{ transform: "rotate(" + clockState.hour + "deg)" }}
          ></div>
          <div
            id="minute"
            className="minute"
            style={{ transform: "rotate(" + clockState.minute + "deg)" }}
          ></div>
          <div
            id="second"
            className="second"
            style={{ transform: "rotate(" + clockState.second + "deg)" }}
          ></div>
        </div>
      </div>
      <div>
        <span>{clockState.now.format("LT")}</span>
      </div>
      <div>
        <span>{props.timezone}</span>
        <IconButton aria-label="remove" onClick={props.handleRemove}>
          <CancelIcon />
        </IconButton>
      </div>
    </Fragment>
  );
};
export default ClockDisplay;
