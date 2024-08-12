import {formattedPrice} from "../../utils/productUtils.ts";
import {Link, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getProductWithId} from "../../services/api.ts";
import {useCartStore} from "../cart/cartStore.ts";
import ProductDetailsLoader from "./ProductDetailsLoader.tsx";
import AppError from "../error/AppError.tsx";
import {useWishlistStore} from "../wishlist/wishlistStore.ts";


const ProductDetails = () => {
    const {productId} = useParams();
    const productQuery = useQuery({queryKey: [productId], queryFn: () => getProductWithId(productId ?? '')});

    const addItemToCart = useCartStore((state) => state.addItem);
    const {wishlist, addToWishlist, removeFromWishlist} = useWishlistStore();


    if (productQuery.isPending) return (<ProductDetailsLoader/>);

    if (productQuery.error) return <AppError/>;

    const product = productQuery.data;
    const isInWishlist = wishlist.some(item => item.productId === product?.id);

    return (
        <div className="p-4">
            <Link to='/'>
                <button className="btn btn-neutral">Back</button>
            </Link>
            <div className="flex flex-col items-center justify-center w-full py-12">
                <div
                    className="flex flex-wrap items-center justify-center self-center w-full md:w-4/5 shadow-xl h-full">
                    <div className="w-full md:w-1/2">
                        <figure>
                            <img
                                src={product?.image}
                                alt="Product"/>
                        </figure>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col self-center gap-8 px-6 py-12">
                        <p className="text-3xl">{product?.title}</p>
                        <p className="text-2xl">{formattedPrice(product?.price ?? 0)}</p>
                        <div className="flex flex-wrap w-full gap-2 justify-center">
                            <button
                                className="w-full md:w-2/5 btn btn-primary"
                                onClick={() => addItemToCart(product?.id)}
                            >
                                Add to Cart
                            </button>
                            <button className={`w-full md:w-2/5 btn ${isInWishlist ? "btn-neutral" : ""}`}
                                    onClick={isInWishlist ? () => removeFromWishlist(product?.id) : () => addToWishlist(product?.id)}
                            >
                                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                            </button>
                        </div>
                        <p>{product?.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;