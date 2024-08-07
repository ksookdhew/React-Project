import {Product} from "../../models/Products.ts";
import {formattedPrice} from "../../utils/productUtils.ts";

const ProductDetails = ({product}: { product: Product }) => {

    return (
        <div className="flex flex-col items-center justify-center w-full py-20">
            <div className="flex flex-wrap items-center justify-center self-center w-4/5 shadow-xl h-full">
                <div className="w-full md:w-1/2 h-2/3">
                    <figure>
                        <img
                            className={""}
                            src={product.image}
                            alt="Product"/>
                    </figure>
                </div>
                <div className="w-full md:w-1/2 flex flex-col self-center gap-8 px-6 py-12">
                    <h2 className="text-3xl">{product.title}</h2>
                    <h2 className="text-2xl">{formattedPrice(product.price)}</h2>
                    <div className="flex flex-wrap w-full gap-2 justify-center">
                        <button className="w-full md:w-2/5 btn">Add to Cart</button>
                        <button className="w-full md:w-2/5 btn btn-neutral">Wishlist</button>
                    </div>
                    <p>{product.description}</p>
                </div>
            </div>

        </div>
    );
}

export default ProductDetails;