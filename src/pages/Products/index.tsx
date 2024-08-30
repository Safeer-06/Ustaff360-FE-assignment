import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../service/Api";
import styles from "./productlist.module.css";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import ProductsList from "../../components/Products/ProductsList";
import FilterSideBarContainer from "../../components/Products/FilterSidebarContainer";
import ProductsSearchContainer from "../../components/Products/ProductsSearchContainer";

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
  const [formData, setFormData] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(productData || []);
  const noData = !productData || !productData?.length || error;

  const handleSubmitFilters = () => {
    if (!formData.minPrice && formData.maxPrice) {
      alert("Please provide min price");
    } else if (!formData.maxPrice && formData.minPrice) {
      alert("Please provide max price");
    } else {
      const filteredProducts = productData?.filter((product) => {
        if (formData.category && product.category !== formData.category) {
          return false;
        }
        if (formData.minPrice && product.price < Number(formData.minPrice)) {
          return false;
        }
        if (formData.maxPrice && product.price > Number(formData.maxPrice)) {
          return false;
        }

        return true;
      });
      setProducts(filteredProducts || []);
      setFilterOpen(false);
    }
  };

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
          formData={formData}
          setFormData={setFormData}
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
