import {useMemo, useState} from "react";
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
    const {data: product, error, isLoading} = useQuery({
        queryKey: [productId],
        queryFn: () => getProductWithId(productId ?? ""),
    });

    const addItemToCart = useCartStore((state) => state.addItem);
    const {wishlist, addToWishlist, removeFromWishlist} = useWishlistStore();

    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const isInWishlist = useMemo(
        () => wishlist.some((item) => item.productId === product?.id),
        [wishlist, product?.id]
    );

    const handleAddToCart = () => {
        setIsAddingToCart(true);
        addItemToCart(product?.id ?? 0);
        setTimeout(() => {
            setIsAddingToCart(false);
        }, 1000);
    };

    if (isLoading) return <ProductDetailsLoader/>;

    if (error) return <AppError/>;

    if (!product) return <AppError/>;

    return (
        <div className="p-4">
            <Link to='/'>
                <button className="btn btn-neutral hover:scale-105">Back</button>
            </Link>
            <div className="flex flex-col items-center justify-center w-full py-12">
                <div
                    className="flex flex-wrap items-center justify-center self-center w-full md:w-4/5 shadow-xl h-full">
                    <div className="w-full md:w-1/2">
                        <figure>
                            <img
                                src={product.image}
                                alt={product.title}
                                loading="lazy"
                            />
                        </figure>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col self-center gap-8 px-6 py-12">
                        <p className="text-3xl">{product.title}</p>
                        <p className="text-2xl">{formattedPrice(product.price)}</p>
                        <div className="flex flex-wrap w-full gap-2 justify-center">
                            <button
                                className={`w-full md:w-2/5 btn btn-primary hover:scale-105 ${isAddingToCart ? "btn-disabled" : ""}`}
                                onClick={handleAddToCart}
                                disabled={isAddingToCart}
                            >
                                {isAddingToCart ? "Adding..." : "Add to Cart"}
                            </button>
                            <button
                                className={`w-full hover:scale-105 md:w-2/5 btn ${isInWishlist ? "btn-neutral" : ""}`}
                                onClick={isInWishlist ? () => removeFromWishlist(product.id) : () => addToWishlist(product.id)}
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
