import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";

import UserDetails from "./index";
import { BASE_URL } from "../../utils/api";

const renderWithRouter = ({ username }: { username: string }) =>
  render(
    <MemoryRouter initialEntries={[`/user/${username}`]}>
      <Route path="/user/:username">
        <UserDetails />
      </Route>
    </MemoryRouter>
  );

test("displays with correct params and github url", () => {
  const username = "sbub";

  const { getByText, container } = renderWithRouter({
    username
  });

  expect(getByText(`Profile of: ${username}`)).toBeInTheDocument();

  const links = container.querySelectorAll("a");
  expect(links[1]?.getAttribute("href")).toBe(`${BASE_URL}/${username}`);
});
