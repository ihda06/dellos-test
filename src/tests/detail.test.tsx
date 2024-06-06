import { render, screen, waitFor } from "@testing-library/react";

import ArticleDetail from "../pages/articles/[id]";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import axios from "axios";
import dayjs from "dayjs";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/articles/[id]",
      pathname: "/articles/[id]",
      query: {
        id: "1",
      },
      asPath: "/articles/[id]",
    };
  },
}));

jest.mock("axios", () => ({
  get: jest.fn(),
}));

jest.mock("cookies-next", () => ({
  getCookie: jest.fn(),
}));

const article = {
  status: "ok",
  copyright:
    "Copyright (c) 2022 The New York Times Company. All Rights Reserved.",
  response: {
    docs: [
      {
        abstract: "This Abstract",
        multimedia: [
          {
            url: "https://www.nytimes.com/image",
          },
        ],
        headline: {
          main: "This title",
        },
        byline: {
          original: "By this name",
        },
        pub_date: "2024-06-01T00:00:00+00:00",
        _id: "1",
      },
    ],
  },
};

const createWrapper = (children: ReactNode) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("Test View Article Detail", () => {
  it("To match snapshot", () => {
    const { asFragment } = render(createWrapper(<ArticleDetail />));
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("Test Data Render Correctly", () => {
  it("to render data correctly", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: article,
    });
    const screen = render(createWrapper(<ArticleDetail />));
    expect(screen.getByText("Loading")).toBeTruthy();
    await waitFor(
      () => expect(screen.getByText("This title")).toBeInTheDocument
    );
    // Wait for the data to be rendered
    // Verify that the data is displayed correctly
    expect(screen.getByText("This title")).toBeInTheDocument;
  });

  describe("Test price", () => {
    it("should display price as 50000 if the article is published within 1 day", async () => {
      const articleSameDay = {
        status: "ok",
        copyright:
          "Copyright (c) 2022 The New York Times Company. All Rights Reserved.",
        response: {
          docs: [
            {
              abstract: "This Abstract",
              multimedia: [
                {
                  url: "https://www.nytimes.com/image",
                },
              ],
              headline: {
                main: "This title",
              },
              byline: {
                original: "By this name",
              },
              pub_date: dayjs().subtract(1, "hour").toISOString(),
              _id: "1",
            },
          ],
        },
      };
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: articleSameDay,
      });

      render(createWrapper(<ArticleDetail />));

      await waitFor(() => {
        expect(screen.getByText("50000")).toBeInTheDocument;
      });
    });

    it("should display price as 20000 if the article is published more than 1 day", async () => {
      const articleOneWeek = {
        status: "ok",
        copyright:
          "Copyright (c) 2022 The New York Times Company. All Rights Reserved.",
        response: {
          docs: [
            {
              abstract: "This Abstract",
              multimedia: [
                {
                  url: "https://www.nytimes.com/image",
                },
              ],
              headline: {
                main: "This title",
              },
              byline: {
                original: "By this name",
              },
              pub_date: dayjs().subtract(2, "day").toISOString(),
              _id: "1",
            },
          ],
        },
      };
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: articleOneWeek,
      });
      render(createWrapper(<ArticleDetail />));

      await waitFor(() => {
        expect(screen.getByText("20000")).toBeInTheDocument;
      });
    });
    it("should display price as 20000 if the article is published more than 1 week", async () => {
      const articleOneWeek = {
        status: "ok",
        copyright:
          "Copyright (c) 2022 The New York Times Company. All Rights Reserved.",
        response: {
          docs: [
            {
              abstract: "This Abstract",
              multimedia: [
                {
                  url: "https://www.nytimes.com/image",
                },
              ],
              headline: {
                main: "This title",
              },
              byline: {
                original: "By this name",
              },
              pub_date: dayjs().subtract(8, "day").toISOString(),
              _id: "1",
            },
          ],
        },
      };
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: articleOneWeek,
      });
      render(createWrapper(<ArticleDetail />));

      await waitFor(() => {
        expect(screen.getByText("0")).toBeInTheDocument;
      });
    });
  });

  describe("Test buy button", () => {
    it("to render buy button", async () => {
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: article,
      });
      const screen = render(createWrapper(<ArticleDetail />));
      expect(screen.getByText("Loading")).toBeTruthy();
      await waitFor(
        () => expect(screen.getByText("Buy Now")).toBeInTheDocument
      );
      // Wait for the data to be rendered
      // Verify that the data is displayed correctly
      expect(screen.getByText("Buy Now")).toBeInTheDocument;
    });
  });
});
