import React, { ReactElement } from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Button from "./Button";
import userEvent from "@testing-library/user-event";

//#TODO: Mock the onClickHandler and assert in below test case
const onClickHandler = async ()=> console.log("Hello button clicked")
const testComponent :ReactElement = (<Button displayName="Display Name" variant="secondary" onClickAction={onClickHandler}/>)

test('Render a Button', async () => {
    render(testComponent);
    expect(await screen.findByRole("button",{name:"Display Name"})).toBeInTheDocument();
    userEvent.click(await screen.findByRole("button",{name:"Display Name"}))
  });