import React, { useState, useEffect } from "react";
import ClockPicker from "./ClockPicker";
import ClocksGrid from "./ClocksGrid";
import { Container } from "@material-ui/core";
import { useParams } from "react-router";
import { isNullOrWhitespace } from "../Common/helpers";

const defaultState: string[] = [];

const ClockList = () => {
  const [clocksList, setClocksList] = useState(defaultState);
  const { id } = useParams();

  useEffect(() => {
    const localStorageValues = localStorage.getItem("internationalClocks");
    if (localStorageValues != null && !isNullOrWhitespace(localStorageValues)) {
      const storage = JSON.parse(localStorageValues);
      const intitialItems: string[] = storage[id];
      if (intitialItems != null) setClocksList(intitialItems);
    }
  }, [id]);

  const changeItems = (items: string[]) => {
    setClocksList(items);
    const localStorageValues = localStorage.getItem("internationalClocks");
    let storage = {};
    if (localStorageValues != null && !isNullOrWhitespace(localStorageValues)) {
      storage = JSON.parse(localStorageValues);
      // @ts-ignore
      storage[id] = items;
    }
    localStorage.setItem("internationalClocks", JSON.stringify(storage));
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
