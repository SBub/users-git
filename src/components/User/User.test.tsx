import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import User from "./index";

test("displays User component with correct values", () => {
  const url =
    "https://i.pinimg.com/564x/69/d1/a7/69d1a70aa26ea48c054c5d2d21d6bd2f.jpg";
  const login = "sbub";
  const { getByText, container } = render(
    <BrowserRouter>
      <User id={1} login={login} avatar_url={url} />
    </BrowserRouter>
  );

  const img = container.querySelector("img");
  const a = container.querySelector("a");

  expect(getByText("sbub")).toBeInTheDocument();
  expect(img?.getAttribute("src")).toBe(url);

  // checking if a will redirect us to the correct place
  expect(a?.getAttribute("href")).toBe(`/user/${login}`);
});
