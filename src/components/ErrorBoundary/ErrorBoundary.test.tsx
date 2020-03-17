import React from "react";
import { render } from "@testing-library/react";

import ErrorBoundary from "./index";

test("displays children when there are no errors", () => {
  const { getByText } = render(
    <ErrorBoundary>
      <p>Hello</p>
    </ErrorBoundary>
  );

  expect(getByText("Hello")).toBeInTheDocument();
});

test("displays error", () => {
  const FailingComponent = () => {
    throw new Error("oops!");
  };
  const { queryByText } = render(
    <ErrorBoundary>
      <FailingComponent />
    </ErrorBoundary>
  );
  expect(queryByText("There is a problem with the app")).toBeInTheDocument();
});
