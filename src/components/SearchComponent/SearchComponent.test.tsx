import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchComponent from "./SearchComponent";

describe("SearchComponent", () => {
  const mockBooksData = {
    items: [
      {
        id: "1",
        volumeInfo: {
          title: "Title 1",
        },
      },
      {
        id: "2",
        volumeInfo: {
          title: "Title 2",
        },
      },
    ],
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render search component", () => {
    render(<SearchComponent />);
    const searchComponent = screen.getByPlaceholderText(/book/i);
    expect(searchComponent).toBeInTheDocument();
  });

  it("should fetch and display options", async () => {
    jest.spyOn(global, "fetch").mockImplementation(
      () =>
        Promise.resolve({
          json: () => Promise.resolve(mockBooksData),
        }) as Promise<Response>
    );
    render(<SearchComponent />);
    const inputElement = screen.getByPlaceholderText(/book/i);
    fireEvent.change(inputElement, { target: { value: 'title' } });

    await waitFor(() => {
        const books = screen.getAllByText(/title 1|title 2/i);
        fireEvent.click(books[1]);
        expect(inputElement).toHaveValue('Title 2');
      });
  });
});