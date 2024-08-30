import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../service/Api";
import styles from "./productlist.module.css";
import Loader from "../../components/Loader";
import { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import ProductsList from "../../components/Products/ProductsList";
import FilterSideBarContainer from "../../components/Products/FilterSidebarContainer";
import ProductsSearchContainer from "../../components/Products/ProductsSearchContainer";
import { MyContext } from "../../context/FormStateContext";

const Products = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const {
    isLoading,
    error,
    data: productData,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const { state, setStateFunc } = useContext(MyContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(productData || []);
  const noData = !productData || !productData?.length || error;

  const handleSubmitFilters = () => {
    if (!state.minPrice && state.maxPrice) {
      alert("Please provide min price");
    } else if (!state.maxPrice && state.minPrice) {
      alert("Please provide max price");
    } else if (
      state.minPrice &&
      state.maxPrice &&
      Number(state.maxPrice) < Number(state.minPrice)
    ) {
      alert("Max price should be greater than min price");
    } else {
      const filteredProducts = productData?.filter((product) => {
        if (state.category && product.category !== state.category) {
          return false;
        }
        if (state.minPrice && product.price < Number(state.minPrice)) {
          return false;
        }
        if (state.maxPrice && product.price > Number(state.maxPrice)) {
          return false;
        }

        return true;
      });
      setProducts(filteredProducts || []);
      setFilterOpen(false);
    }
  };

  console.log("test: ", state);
  useEffect(() => {
    if (searchTerm) {
      const filterredProducts = products?.filter((product) => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setProducts(filterredProducts || []);
    } else {
      setProducts(productData || []);
    }
  }, [searchTerm]);

  useEffect(() => {
    setProducts(productData || []);
  }, [productData]);

  return (
    <div>
      <Sidebar
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        placement="left"
      >
        <FilterSideBarContainer
          formData={state}
          setFormData={setStateFunc}
          handleSubmitFilters={handleSubmitFilters}
        />
      </Sidebar>
      <div>
        <div className={styles["product_container"]}>
          <ProductsSearchContainer
            filterOpen={filterOpen}
            setFilterOpen={setFilterOpen}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        {isLoading ? (
          <div className={styles["error_loading_container"]}>
            <Loader size="large" />
          </div>
        ) : noData ? (
          <div className={styles["error_loading_container"]}>
            <p className={styles["no_products"]}>No products found</p>
          </div>
        ) : (
          <ProductsList productData={products} />
        )}
      </div>
    </div>
  );
};

export default Products;
