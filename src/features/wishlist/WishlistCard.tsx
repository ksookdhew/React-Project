import {useWishlistStore, WishlistItem} from "./wishlistStore.ts";
import {useCartStore} from "../cart/cartStore.ts";
import {useQuery} from "@tanstack/react-query";
import {getProductWithId} from "../../services/api.ts";
import {formattedPrice} from "../../utils/productUtils.ts";
import React, {Suspense} from "react";

const WishlistItemLoader = React.lazy(() => import("./WishlistItemLoader.tsx"));
const AppError = React.lazy(() => import("../error/AppError.tsx"));

const WishlistProductCard = ({wishlistItem}: { wishlistItem: WishlistItem }) => {
    const productQuery = useQuery({
        queryKey: [wishlistItem.productId],
        queryFn: () => getProductWithId(`${wishlistItem.productId}`),
    });

    const removeItemFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
    const addItemToCart = useCartStore((state) => state.addItem);

    if (productQuery.isLoading) {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <WishlistItemLoader/>
            </Suspense>
        );
    }

    if (productQuery.error) {
        return (
            <Suspense fallback={<div>Error</div>}>
                <AppError/>
            </Suspense>
        );
    }

    const product = productQuery.data;
    if (!product) {
        return (
            <Suspense fallback={<div>Product not found</div>}>
                <AppError/>
            </Suspense>
        );
    }

    return (
        <div className="card card-side bg-base-100 shadow-xl w-full">
            <figure className="w-32">
                <img
                    className={"w-full"}
                    src={product?.image}
                    alt="Product"/>
            </figure>
            <div className="card-body">
                <div className="card-actions justify-end">
                    <button className="btn btn-square btn-sm hover:scale-110"
                            onClick={() => removeItemFromWishlist(product?.id)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <h2 className="card-title">{product?.title}</h2>
                <p>{formattedPrice(product?.price)}</p>
                <div className="card-actions justify-end">
                    <button
                        className="btn btn-primary hover:scale-110"
                        onClick={() => {
                            addItemToCart(product?.id);
                            removeItemFromWishlist(product?.id);
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WishlistProductCard;