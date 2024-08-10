import { WishlistItem, useWishlistStore } from "./wishlistStore.ts";
import { useCartStore } from "../cart/cartStore.ts";
import { useQuery } from "@tanstack/react-query";
import { getProductWithId } from "../../services/api.ts";
import { formattedPrice } from "../../utils/productUtils.ts";

const WishlistProductCard = ({ wishlistItem }: { wishlistItem: WishlistItem }) => {
    const productQuery = useQuery({
        queryKey: [wishlistItem.productId],
        queryFn: () => getProductWithId(`${wishlistItem.productId}` ?? '')
    });

    const removeItemFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
    const addItemToCart = useCartStore((state) => state.addItem);

    if (productQuery.isPending) return <div>Loading...</div>;

    if (productQuery.error) return <div>Error: {productQuery.error.message}</div>;

    const product = productQuery.data;

    return (
        <div className="card card-side bg-base-100 shadow-xl w-full">
            <figure className="w-32">
                <img
                    className={"w-full"}
                    src={product?.image}
                    alt="Product" />
            </figure>
            <div className="card-body">
                <div className="card-actions justify-end">
                    <button className="btn btn-square btn-sm" onClick={() => removeItemFromWishlist(product?.id)}>
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
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <h2 className="card-title">{product?.title}</h2>
                <p>{formattedPrice(product?.price)}</p>
                <div className="card-actions justify-end">
                    <button
                        className="btn btn-primary"
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