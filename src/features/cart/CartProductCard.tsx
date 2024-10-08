import {CartItem, useCartStore} from "./cartStore.ts";
import {useQuery} from "@tanstack/react-query";
import {getProductWithId} from "../../services/api.ts";
import {formattedPrice} from "../../utils/productUtils.ts";
import React, {Suspense} from "react";

const CartItemLoader = React.lazy(() => import("./CartItemLoader.tsx"));
const AppError = React.lazy(() => import("../error/AppError.tsx"));

const CartProductCard = ({ cartItem }: { cartItem: CartItem }) => {
    const productQuery = useQuery({
        queryKey: [cartItem.productId],
        queryFn: () => getProductWithId(`${cartItem.productId}`),
    });

    const addItemToCart = useCartStore((state) => state.addItem);
    const decreaseItemFromCart = useCartStore((state) => state.decreaseItem);
    const removeItemFromCart = useCartStore((state) => state.removeFromCart);

    if (productQuery.isLoading) {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <CartItemLoader />
            </Suspense>
        );
    }

    if (productQuery.error) {
        return (
            <Suspense fallback={<div>Error</div>}>
                <AppError />
            </Suspense>
        );
    }

    const product = productQuery.data;
    if (!product) {
        return (
            <Suspense fallback={<div>Product not found</div>}>
                <AppError />
            </Suspense>
        );
    }

    return (
        <div className="card card-side bg-base-100 shadow-xl w-full">
            <figure className="w-32">
                <img
                    className={"w-full"}
                    src={product.image}
                    alt="Product"
                    loading="lazy"
                />
            </figure>
            <div className="card-body">
                <div className="card-actions justify-end">
                    <button className="btn btn-square btn-sm hover:scale-110" onClick={() => removeItemFromCart(product.id)}>
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
                <h2 className="card-title">{product.title}</h2>
                <p>{formattedPrice(product.price)}</p>
                <div className="card-actions justify-end w-fit">
                    <button className="btn btn-primary btn-sm hover:scale-110" onClick={() => decreaseItemFromCart(product.id)}>-
                    </button>
                    <p className="self-center text-2xl">{cartItem.quantity} </p>
                    <button className="btn btn-primary btn-sm hover:scale-110" onClick={() => addItemToCart(product.id)}>+</button>
                </div>
            </div>
        </div>
    );
}

export default CartProductCard;