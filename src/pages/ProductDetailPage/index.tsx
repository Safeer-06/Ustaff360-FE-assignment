import React from "react";
import styles from "./productdetail.module.css";
import { useParams } from "react-router-dom";
import { MockData } from "../../service/MockData";
import Button from "../../components/Button";

const ProductDetailPage = () => {
  const productId = useParams()?.id as string;
  const currentProduct = MockData.find(
    (product) => product.id === Number(productId)
  );
  return (
    <div className={styles["main_container"]}>
      <h1>{currentProduct?.name}</h1>
      <div className={styles["details_container"]}>
        <div className={styles["image_container"]}>
          <img
            src={currentProduct?.imageSrc}
            alt={currentProduct?.name}
            className={styles["product_image"]}
            width={"100%"}
            height={"100%"}
          />
        </div>
        <div className={styles["information_container"]}>
          <p className={styles["label"]}>
            Price:{" "}
            <span className={styles["price"]}>${currentProduct?.price}</span>
          </p>
          <p className={styles["label"]}>
            Category: {currentProduct?.category}
          </p>
          <Button className={styles["add_to_cart"]}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
