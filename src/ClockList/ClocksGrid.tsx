import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ClocksGridProps from "../Interfaces/ClocksGridProps";
import ClockDisplay from "./ClockDisplay";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

const ClocksGrid = (props: ClocksGridProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {props.list.map((clock, index) => (
          <Grid item xs key={`${index}_${clock}`}>
            <Paper className={classes.paper}>
              <ClockDisplay
                timezone={clock}
                handleRemove={() => {
                  props.handleRemove(index);
                }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default ClocksGrid;
