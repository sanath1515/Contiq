import React from "react";
import { render } from "@testing-library/react";
import Notification from ".";
import "@testing-library/jest-dom";

describe("Notification component", () => {
  const mockProps = {
    src: "avatar-image.jpg",
    alt: "User Avatar",
    userName: "John Doe",
    notificationText: "You have a new message.",
    dateTime: { day: 23, month: "August", time: "15:30" },
  };

  it("should render correctly with provided props", () => {
    const { getByAltText, getByText } = render(<Notification {...mockProps} />);

    const avatar = getByAltText("User Avatar");
    expect(avatar).toBeInTheDocument();

    const userName = getByText("John Doe");
    expect(userName).toBeInTheDocument();

    const notificationText = getByText("You have a new message.");
    expect(notificationText).toBeInTheDocument();

    const dateTime = getByText("23 August 15:30");
    expect(dateTime).toBeInTheDocument();
  });
});
