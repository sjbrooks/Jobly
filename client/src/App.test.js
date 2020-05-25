import React from 'react';
import { render, waitForElement } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from './App';


describe("Jobly routes", function() {
  it("renders without crashing", async function() {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("Log in"));
  });

  it("renders the home snapshot", async function() {
    const { asFragment, getByText, getAllByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    await waitForElement(() => getByText("All the jobs in one convenient place."));
    getByText("Login");
    getAllByText("Jobly");

    expect(asFragment()).toMatchSnapshot();
  });
});