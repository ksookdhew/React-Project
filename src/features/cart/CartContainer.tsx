import {useCartStore} from "./cartStore.ts";
import CartProductCard from "./CartProductCard.tsx";
import CartSummary from "./CartSummary.tsx";
import {useQuery} from "@tanstack/react-query";
import {Product} from "../../models/Products.ts";
import {getAllProducts} from "../../services/api.ts";
import {formattedPrice} from "../../utils/productUtils.ts";
import {Link} from "react-router-dom";
import AppError from "../error/AppError.tsx";

const CartContainer = () => {
    const cartState = useCartStore((state) => state.cart);
    const totalNumItems = useCartStore((state) => state.cartNumItems);
    const clearCart = useCartStore((state) => state.clearCart);
    const allProductsQuery = useQuery<Product[]>({
        queryKey: ['allProducts'],
        queryFn: getAllProducts
    });

    const totalPrice = cartState.reduce((runningTotal, item) => {
        const product = allProductsQuery.data?.find((prod) => prod.id === item.productId);
        const productPrice = product?.price ?? 0;
        return runningTotal + productPrice * item.quantity;
    }, 0);

    if (allProductsQuery.isPending) return (
        <div className="p-4 flex w-full h-60 justify-center items-center">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    );

    if (allProductsQuery.error) return <AppError/>;

    return (
        <div className="p-4">
            <h1 className="text-4xl">Your Shopping Cart</h1>
            {cartState.length === 0 ? (
                <div className="flex flex-col justify-center items-center">
                    <div className="card bg-base-100 w-96 shadow-xl self-center justify-center">
                        <div className="card-body gap-8 justify-center text-center">
                            <h2 className="card-title text-2xl">Your cart is empty</h2>
                            <Link to="/">
                                <button className="btn btn-primary hover:scale-110">Continue shopping</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-wrap w-full h-full mr-2 mt-2">
                    <div className="w-full md:w-2/3 flex flex-col justify-start gap-8 px-2">
                        {cartState.map((item) => (
                            <CartProductCard key={item.productId} cartItem={item}/>
                        ))}
                        <button className="btn btn-neutral w-fit hover:scale-110" onClick={clearCart}>Clear cart</button>
                    </div>
                    <div className="w-full md:w-1/3 ">
                        <CartSummary total={formattedPrice(totalPrice)} numItems={totalNumItems}/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartContainer;
