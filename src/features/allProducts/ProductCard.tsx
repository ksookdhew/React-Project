import {Product} from "../../models/Products.ts";
import {formattedPrice} from "../../utils/productUtils.ts";
import {Link} from "react-router-dom";

const ProductCard = ({product}: { product: Product }) => {
    return (
        <Link to={`product/${product.id}`} key={product.id}>
            <div className="card bg-base-100 w-80 h-96 shadow-xl">
                <figure className={"h-56"}>
                    <img
                        className={"h-56"}
                        src={product.image}
                        alt="Product"
                        loading="lazy"
                    />
                </figure>
                <div className="card-body mb-10">
                    <h3 className="text-md">{product.title}</h3>
                    <h2 className="card-title">{formattedPrice(product.price)}</h2>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
