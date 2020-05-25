import React from "react";
import { render, waitForElement } from "@testing-library/react";
import Company from "./Company";
import { MemoryRouter, Route } from "react-router-dom";
import { UserProvider } from "../testUtils";

it("renders without crashing", function() {
  render(
    <MemoryRouter>
      <UserProvider>
        <Company />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", async function() {
  const { asFragment, getAllByText } = render(
    <MemoryRouter initialEntries={["/companies/anderson-arias-and-morrow"]}>
      <UserProvider>
        <Route path="/companies/:handle">
          <Company />
        </Route>
      </UserProvider>
    </MemoryRouter>
  );

  await waitForElement(() => getAllByText(/Anderson, Arias and Morrow/));

  expect(asFragment()).toMatchSnapshot();
});
