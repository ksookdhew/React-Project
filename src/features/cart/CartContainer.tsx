import { useCartStore } from "./cartStore.ts";
import CartProductCard from "./CartProductCard.tsx";

const CartContainer = () => {
    const cartState = useCartStore((state) => state.cart);

    console.log(cartState)

    return (
        <div className=" flex flex-wrap gap-4 p-4">
            {cartState.length === 0 ? (
                <div>Empty Cart</div>
            ) : (
                cartState.map((item) => (
                    <CartProductCard key={item.productId} cartItem={item} />
                ))
            )}
        </div>
    );
}

export default CartContainer;
