import Button from "../../Button";
import Input from "../../Input";
import FilterIcon from "../../../assets/images/filter-icon.svg";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./productssearchcontainer.module.css";

const ProductsSearchContainer = ({
  setFilterOpen,
  filterOpen,
  searchTerm,
  setSearchTerm,
}: {
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filterOpen: boolean;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className={styles["product_filters_container"]}>
      <div className={styles["search_container"]}>
        <Input
          placeholder="Search for product"
          className={styles["search_input"]}
          value={searchTerm}
          prefix={<SearchOutlined />}
          onChange={(event) => {
            const value = event.target.value;
            setSearchTerm(value);
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

export default ProductsSearchContainer;
