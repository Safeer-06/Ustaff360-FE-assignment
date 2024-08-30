import React from "react";
import { ProductDataDocument } from "../../../service/MockData";
import styles from "./productcontainer.module.css";

const ProductContainer = ({ product }: { product: ProductDataDocument }) => {
  return (
    <div className={styles["product_container"]}>
      <div>
        <img
          src={product.imageSrc}
          alt={product.name}
          width={"100%"}
          height={225}
          className={styles["product_img"]}
        />
      </div>
      <div className={styles["product_information_container"]}>
        <p className={styles["product_title"]}>
          {product.name} - {product.category}
        </p>
        <p className={styles["product_price"]}>${product.price}</p>
      </div>
    </div>
  );
};

export default ProductContainer;
