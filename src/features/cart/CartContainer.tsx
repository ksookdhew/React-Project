import {useCartStore} from "./cartStore.ts";
import CartProductCard from "./CartProductCard.tsx";
import CartSummary from "./CartSummary.tsx";
import {useQuery} from "@tanstack/react-query";
import {Product} from "../../models/Products.ts";
import {getAllProducts} from "../../services/api.ts";
import {formattedPrice} from "../../utils/productUtils.ts";

const CartContainer = () => {
    const cartState = useCartStore((state) => state.cart);
    const allProductsQuery = useQuery<Product[]>({
        queryKey: ['allProducts'],
        queryFn: getAllProducts
    });

    const totalPrice = cartState.reduce((runningTotal, item) => {
        const product = allProductsQuery.data?.find((prod) => prod.id === item.productId);
        const productPrice = product?.price ?? 0;
        return runningTotal + productPrice * item.quantity;
    }, 0);

    const totalNumItems = cartState.reduce((runningTotal, item) => {
        return runningTotal + item.quantity;
    }, 0);

    return (
        <div className="p-4">
            <h1 className="text-4xl">Your Shopping Cart</h1>
            {cartState.length === 0 ? (
                <div>Empty Cart</div>
            ) : (
                <div className="flex flex-wrap w-full shadow-xl h-full mr-2 mt-2">
                    <div className="w-full md:w-2/3 flex flex-col self-center gap-8 px-6 ">
                        {cartState.map((item) => (
                            <CartProductCard key={item.productId} cartItem={item}/>
                        ))}
                    </div>
                    <div className="w-full md:w-1/3">
                        <CartSummary total={formattedPrice(totalPrice)} numItems={totalNumItems}/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartContainer;
