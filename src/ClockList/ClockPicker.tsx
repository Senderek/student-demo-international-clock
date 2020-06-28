import React, { useState, ChangeEvent } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Paper } from "@material-ui/core";
import ClockPickerItem from "../Interfaces/ClockPickerItem";
import { v4 as uuidv4 } from "uuid";
import AcceptIcon from "@material-ui/icons/AddBox";
import IconButton from "@material-ui/core/IconButton";
import * as moment from "moment-timezone";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    icon: {
      marginTop: theme.spacing(2),
    },
  })
);

const defaultValue: string = uuidv4();
const timezonesToOptions = (y: string, index: number) => {
  const r: ClockPickerItem = {
    id: index === 0 ? defaultValue : uuidv4(),
    val: y,
  };
  return r;
};

const ClockPicker = (props: any) => {
  const classes = useStyles();
  const [pickerValue, setPickerValue] = useState(defaultValue);
  const [pickerItems] = useState(moment.tz.names().map(timezonesToOptions));

  const handleSubmit = () => {
    const itemIndex = pickerItems.findIndex((x) => x.id === pickerValue);
    if (itemIndex >= 0) {
      props.handleSubmit(pickerItems[itemIndex].val);
    }
    setPickerValue(defaultValue);
  };

  const onChange = (
    event: ChangeEvent<{ name?: string | undefined; value: any }>
  ) => {
    setPickerValue(event.target.value);
  };

  return (
    <Paper component="form" onSubmit={props.handleSubmit}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Add timezone</InputLabel>
        <Select
          labelId="val"
          id="demo-simple-select"
          value={pickerValue}
          onChange={onChange}
        >
          {pickerItems.map((pickerItem) => {
            return <MenuItem value={pickerItem.id}>{pickerItem.val}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <IconButton
        className={classes.icon}
        aria-label="confirm"
        onClick={handleSubmit}
      >
        <AcceptIcon />
      </IconButton>
    </Paper>
  );
};
export default ClockPicker;
