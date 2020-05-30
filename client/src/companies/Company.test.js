import React from "react";
import { render, waitForElement } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { UserProvider } from "../testUtils";
import Company from "./Company";
import axiosMock from "../__mocks__/axios";

jest.mock('axios');

describe("Company", function () {
  it("renders without crashing", function () {
    render(
      <MemoryRouter>
        <UserProvider>
          <Company />
        </UserProvider>
      </MemoryRouter>
    );
  });

  it("matches snapshot", async function () {
    const { asFragment, getByText } = render(
      <MemoryRouter initialEntries={["/companies/anderson-arias-and-morrow"]}>
        <UserProvider>
          <Company />
        </UserProvider>
      </MemoryRouter>
    );

    await waitForElement(() => getByText("Submit"));
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(asFragment()).toMatchSnapshot();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
