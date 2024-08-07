import {Product} from "../../models/Products.ts";
import {formattedPrice} from "../../utils/productUtils.ts";

const ProductCard = ({product}: { product: Product }) => {
    return (
        <div className="card bg-base-100 w-80 shadow-xl">
            <figure>
                <img
                    className={"h-52"}
                    src={product.image}
                    alt="Product"/>
            </figure>
            <div className="card-body mb-10">
                <h3 className="text-md">{product.title}</h3>
                <h2 className="card-title">{formattedPrice(product.price)}</h2>
            </div>
        </div>
    );
}

export default ProductCard;
