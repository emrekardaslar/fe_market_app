import { Link } from "@remix-run/react";
import { FC, useRef } from "react";

interface Product {
  id: string;
  category: string;
  subCategory: string;
  imgLink: string;
  price: number;
  description: string;
}
interface HplProps {
  products: Product[];
  base: string;
  button: boolean;
}

export const Hpl: FC<HplProps> = ({ products, base, button = false }) => {
  const containerRef = useRef<any>();

  const scroll = (scrollOffset: number) => {
    containerRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className={"hpl"}>
      <div ref={containerRef} className={"hpl-container"}>
        {products.map((product) => (
          <div className={"hpl-card"}>
            <div className={"hpl-image"}>
              <Link
                prefetch="intent"
                to={
                  base == "products"
                    ? `${product.category}/${product.subCategory}/${product.id}`
                    : `${product.subCategory}/${product.id}`
                }
              >
                <img src={product.imgLink} alt={product.description} />
              </Link>
            </div>
            <div className={"hpl-desc"}>
              <p>{product.description}</p>
            </div>
            <p className={"hpl-price"}>${product.price}</p>
          </div>
        ))}
        {/* 

           */}
      </div>
      {button && products.length > 6 && (
        <button
          className={"scrollRightbtn"}
          onClick={() => {
            scroll(900);
          }}
        >
          {" > "}
        </button>
      )}

      {button && products.length > 6 && (
        <button
          className={"scrollLeftBtn"}
          onClick={() => {
            scroll(-900);
          }}
        >
          {" < "}
        </button>
      )}
    </div>
  );
};
