import React from "react";
import { Details } from "./Details";
import uniqid from "uniqid";
import style from "../styles/WechselrichterData.module.css";

const WechselrichterData = (props) => {
  function handleInvalid(e) {
    const validityState = e.target.validity;
    if (validityState.valueMissing)
      e.target.setCustomValidity("Bitte füllen Sie dieses Feld aus");
  }
  function test(e) {
    const validityState = e.target.validity;
    if (!validityState.valueMissing) e.target.setCustomValidity("");
  }

  return (
    <div className>
      {props.elements.map((detail, index) => {
        return (
          <Details
            name={detail}
            value={props.value[index]}
            key={uniqid()}
            onChange={props.onChange}
          ></Details>
        );
      })}
    </div>
  );
};

export { WechselrichterData };
