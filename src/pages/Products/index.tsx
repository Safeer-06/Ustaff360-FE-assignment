import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../service/Api";
import styles from "./productlist.module.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import FilterIcon from "../../assets/images/filter-icon.svg";
import { SearchOutlined } from "@ant-design/icons";
import { CategoryOptions, ProductDataDocument } from "../../service/MockData";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import ProductContainer from "../../components/Products/ProductContainer";
import Select from "../../components/Select";
import { useNavigate } from "react-router-dom";

interface FormData {
  category: string;
  minPrice: string;
  maxPrice: string;
  searchTerm: string;
}

const ProductsList = ({
  productData,
}: {
  productData: ProductDataDocument[];
}) => {
  const navigate = useNavigate();
  return (
    <div className={styles["products_list_container"]}>
      {(productData || []).map((product) => {
        return (
          <div
            key={product.id}
            className={styles["product_item"]}
            onClick={() => navigate(`/product-detail-page/${product.id}`)}
          >
            <ProductContainer product={product} />
          </div>
        );
      })}
    </div>
  );
};

const ProductsSearchFilterContainer = ({
  setFilterOpen,
  filterOpen,
  formData,
  setFormData,
}: {
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filterOpen: boolean;
  products: ProductDataDocument[];
  setProducts: React.Dispatch<React.SetStateAction<ProductDataDocument[]>>;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}) => {
  return (
    <div className={styles["product_filters_container"]}>
      <div className={styles["search_container"]}>
        <Input
          placeholder="Search for product"
          className={styles["search_input"]}
          value={formData?.searchTerm}
          prefix={<SearchOutlined />}
          onChange={(event) => {
            const value = event.target.value;
            setFormData({ ...formData, searchTerm: value });
          }}
        />
      </div>
      <div className={styles["button_container"]}>
        <Button
          className={styles["filters_button"]}
          icon={
            <img src={FilterIcon} alt="Filter Icon" width={20} height={20} />
          }
          iconPosition="start"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          Filters
        </Button>
      </div>
    </div>
  );
};

const FilterSideBarContainer = ({
  formData,
  setFormData,
}: {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}) => {
  const categories = CategoryOptions.map((category) => {
    return {
      label: category,
      value: category,
    };
  });
  return (
    <div className={styles["filter_sidebar_container"]}>
      <h1>Filters</h1>
      <div>
        <h3>Category</h3>
        <div>
          <Select
            options={categories}
            className={styles["filter_select"]}
            value={formData.category}
            onChange={(value) => {
              setFormData({ ...formData, category: value });
            }}
          />
        </div>
      </div>
      <div>
        <h3>Price Range</h3>
        <div className={styles["price_range_container"]}>
          <Input
            placeholder="Min"
            className={styles["filter_input"]}
            type="number"
            value={formData.minPrice}
            onChange={(event) => {
              setFormData({ ...formData, minPrice: event.target.value });
            }}
          />
          <div className={styles["divider"]}>-</div>
          <Input
            placeholder="Max"
            className={styles["filter_input"]}
            type="number"
            value={formData.maxPrice}
            onChange={(event) => {
              setFormData({ ...formData, maxPrice: event.target.value });
            }}
          />
        </div>
      </div>
      <div>
        <Button className={styles["submit"]}>Submit</Button>
      </div>
    </div>
  );
};

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
    searchTerm: "",
  });
  const [products, setProducts] = useState(productData || []);
  const noData = !productData || !productData?.length || error;

  useEffect(() => {
    setProducts(productData || []);
  }, [productData]);

  useEffect(() => {
    const { category, minPrice, maxPrice, searchTerm } = formData;
    if (category || minPrice || maxPrice || searchTerm) {
    }
  }, [formData]);
  return (
    <div>
      <Sidebar
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        placement="left"
      >
        <FilterSideBarContainer formData={formData} setFormData={setFormData} />
      </Sidebar>
      <div>
        <div className={styles["product_container"]}>
          <ProductsSearchFilterContainer
            filterOpen={filterOpen}
            setFilterOpen={setFilterOpen}
            setProducts={setProducts}
            products={products}
            setFormData={setFormData}
            formData={formData}
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
          <ProductsList productData={products || []} />
        )}
      </div>
    </div>
  );
};

export default Products;
