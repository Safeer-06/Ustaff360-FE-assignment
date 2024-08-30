import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MockData } from "./service/MockData";
import App from "./App";
import { ContextProvider } from "./context/FormStateContext";

const queryClient = new QueryClient();

describe("App", () => {
  let products;
  beforeEach(async () => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <App />
        </ContextProvider>
      </QueryClientProvider>
    );
    // wait for the data to load
    await waitFor(
      () => {
        products = screen.getAllByTestId("product");
        expect(products.length).toBe(MockData.length);
      },
      { timeout: 3000 }
    );
  });

  test("searches for products", async () => {
    // get the search input
    const searchInput = screen.getByPlaceholderText("Search for product");
    // search for a product
    fireEvent.change(searchInput, { target: { value: "Tesla" } });
    await waitFor(() => {
      products = screen.getAllByTestId("product");
      expect(products.length).toBe(1);
    });
    // search for a product that doesn't exist
    fireEvent.change(searchInput, { target: { value: "Product 100" } });
    await waitFor(() => {
      // no products should be displayed
      // no element with the test id 'product' should be found
      expect(screen.queryByTestId("product")).toBeNull();
    });
  });

  test("filters products", async () => {
    // get the filter button
    const filterButton = screen.getByText("Filters");
    // open the filter sidebar
    fireEvent.click(filterButton);
    // wait for the filter sidebar to open
    await waitFor(() => {
      expect(screen.getByTestId("filter-sidebar")).toBeInTheDocument();
    });
    // get the min price input
    const minPriceInput = screen.getByPlaceholderText("Min");
    // get the max price input
    const maxPriceInput = screen.getByPlaceholderText("Max");
    // set the min price
    fireEvent.change(minPriceInput, { target: { value: "100" } });
    // set the max price
    fireEvent.change(maxPriceInput, { target: { value: "300" } });
    // get the apply filters button
    const applyFiltersButton = screen.getByText("Submit");
    // apply the filters
    fireEvent.click(applyFiltersButton);
    await waitFor(
      () => {
        products = screen.getAllByTestId("product");
        expect(products.length).toBe(7);
      },
      { timeout: 3000 }
    );
  });

  test("navigates to product detail page", async () => {
    // get the first product
    const product = screen.getAllByTestId("product")[0];
    // click on the product
    fireEvent.click(product);
    // wait for the product detail page to open
    await waitFor(() => {
      // check if pathname is '/product-detail-page/1'
      expect(window.location.pathname).toBe("/product-detail-page/1");
    });
  });
});
