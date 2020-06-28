import React, { useState, useEffect } from "react";
import ClockPicker from "./ClockPicker";
import ClocksGrid from "./ClocksGrid";
import { Container } from "@material-ui/core";
import { useParams } from "react-router";
import { isNullOrWhitespace } from "../Common/helpers";
import axios from "axios";

const defaultState: string[] = [];

const ClockList = () => {
  const [clocksList, setClocksList] = useState(defaultState);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3006/internationalClock/${id}`)
      .then((result) => {
        const storage = JSON.parse(result.data);
        const intitialItems: string[] = storage[id];
        if (intitialItems != null) setClocksList(intitialItems);
      });
  }, [id]);

  const changeItems = (items: string[]) => {
    axios.post(`http://localhost:3006/internationalClock/${id}`).then(() => {
      setClocksList(items);
    });
  };

  const handleNewItem = (item: string) => {
    let newList = [...defaultState];
    if (clocksList != null) {
      newList = [...clocksList, item];
    } else newList = [item];
    changeItems(newList);
  };
  const handleRemoveItem = (index: number) => {
    const newClocksList = clocksList.filter(
      (_e: any, i: number) => i !== index
    );
    changeItems(newClocksList);
  };

  return (
    <Container>
      <ClockPicker handleSubmit={handleNewItem} />
      <ClocksGrid list={clocksList} handleRemove={handleRemoveItem} />
    </Container>
  );
};

export default ClockList;
