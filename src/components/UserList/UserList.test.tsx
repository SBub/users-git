import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import UserList from "./index";
import useIntersection from "../../hooks/useIntersection";

jest.mock("../../hooks/useIntersection");

describe("displays UserList with ", () => {
  (useIntersection as jest.Mock).mockReturnValue({
    setNode: () => {}
  });

  const { container, getByText, getByTestId, getAllByTestId } = render(
    <BrowserRouter>
      <UserList />
    </BrowserRouter>
  );

  test("initial values first and users later", async () => {
    expect(getByText("Users")).toBeInTheDocument();

    // show input
    const input = container.querySelector("input");
    expect(input?.getAttribute("placeholder")).toBe("Search by user name");

    const usersList = getByTestId("users-list");
    expect(usersList.childNodes.length).toBe(0);

    const spinner = container.querySelector(".spinner");
    expect(spinner).toBeInTheDocument();

    await waitForElement(() => container.querySelector("img"));

    expect(container.querySelectorAll("img").length).toBe(30);

    // searching user by a name
    const searchQuery = "sbub";
    fireEvent.change(input, { target: { value: searchQuery } });

    await waitForElement(() => container.querySelector("img"));

    expect(container.querySelectorAll("img").length).toBe(20);

    const userNameTags = getAllByTestId("user-name");
    userNameTags.forEach(userEl => {
      expect(userEl.textContent?.toLowerCase()).toContain("sbub");
    });
  });
});
