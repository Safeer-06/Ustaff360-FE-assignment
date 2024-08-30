import { useNavigate } from "react-router-dom";
import { ProductDataDocument } from "../../../service/MockData";
import ProductContainer from "../ProductContainer";
import styles from "./productslist.module.css";

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
            data-testid="product"
          >
            <ProductContainer product={product} />
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
