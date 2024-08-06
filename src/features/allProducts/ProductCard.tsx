import {Product} from "../../models/Products.ts";

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div className="card bg-base-100 w-80 shadow-xl">
            <figure>
                <img
                    className={"h-52"}
                    src={product.image}
                    alt="Product" />
            </figure>
            <div className="card-body mb-10">
                <h2 className="card-title">{product.title}</h2>
                <p className="text-info text-xl">${product.price.toFixed(2)}</p>
            </div>
        </div>
    );
}

export default ProductCard;
