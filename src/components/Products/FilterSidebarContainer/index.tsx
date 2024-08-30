import { CategoryOptions } from "../../../service/MockData";
import Button from "../../Button";
import Input from "../../Input";
import Select from "../../Select";
import styles from "./filtersidebarcontainer.module.css";

export interface FormData {
  category: string;
  minPrice: string;
  maxPrice: string;
}

const FilterSideBarContainer = ({
  formData,
  setFormData,
  handleSubmitFilters,
}: {
  formData: FormData;
  setFormData: (newState: FormData) => void;
  handleSubmitFilters: () => void;
}) => {
  const categories = CategoryOptions.map((category) => {
    return {
      label: category,
      value: category,
    };
  });

  return (
    <div
      className={styles["filter_sidebar_container"]}
      data-testid="filter-sidebar"
    >
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
        <Button
          className={styles["submit"]}
          onClick={() => {
            handleSubmitFilters();
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FilterSideBarContainer;
