import { render, screen, waitFor } from "@testing-library/react";

import { getCookie } from "cookies-next";
import "@testing-library/jest-dom";
import Sidebar from "./sidebar";

jest.mock("cookies-next", () => ({
  getCookie: jest.fn(),
}));

describe("Sidebar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display loading state initially", () => {
    render(<Sidebar />);
    waitFor(() => expect(screen.getByText("Loading")).toBeInTheDocument());
    // expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("should display coin value after loading", async () => {
    (getCookie as jest.Mock).mockImplementation((name) => {
      switch (name) {
        case "my_coin":
          return "200";
        default:
          return undefined;
      }
    });

    const { container } = render(<Sidebar />);

    // Simulate the effect to update loading state
    await waitFor(() => {
      expect(screen.getByText("200")).toBeInTheDocument();
      expect(container.getElementsByClassName("animate-pulse").length).toBe(0);
    });
  });

  it("should display articles after loading", async () => {
    const articles = JSON.stringify([
      { id: 1, title: "Article 1" },
      { id: 2, title: "Article 2" },
    ]);

    (getCookie as jest.Mock).mockImplementation((name) => {
      switch (name) {
        case "my_articles":
          return articles;
        default:
          return undefined;
      }
    });

    const { container } = render(<Sidebar />);

    // Simulate the effect to update loading state
    await waitFor(() => {
      expect(screen.getByText("1. Article 1")).toBeInTheDocument();
      expect(screen.getByText("2. Article 2")).toBeInTheDocument();
      expect(container.getElementsByClassName("animate-pulse").length).toBe(0);
    });
    setTimeout(() => {}, 0);
  });

  it("should display no articles message if no articles found", async () => {
    (getCookie as jest.Mock).mockImplementation((name) => {
      switch (name) {
        case "my_articles":
          return undefined;
        default:
          return undefined;
      }
    });

    const { container } = render(<Sidebar />);

    await waitFor(() => {
      expect(
        screen.getByText(/you don't have any article/i)
      ).toBeInTheDocument();
      expect(container.getElementsByClassName("animate-pulse").length).toBe(0);
    });
  });
});
