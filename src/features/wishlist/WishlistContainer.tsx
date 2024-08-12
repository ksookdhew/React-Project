import {useWishlistStore} from "./wishlistStore.ts";
import {Link} from "react-router-dom";
import WishlistProductCard from "./WishlistCard.tsx";

const WishlistContainer = () => {
    const wishlistState = useWishlistStore((state) => state.wishlist);
    const clearWishlist = useWishlistStore((state) => state.clearWishlist);

    return (
        <div className="p-4">
            <h1 className="text-4xl">Your Wishlist</h1>
            {wishlistState.length === 0 ? (
                <div className="flex flex-col justify-center items-center">
                    <div className="card bg-base-100 w-96 shadow-xl self-center justify-center">
                        <div className="card-body gap-8 justify-center text-center">
                            <h2 className="card-title text-2xl">Your Wishlist is empty</h2>
                            <Link to="/">
                                <button className="btn btn-primary">Continue browsing</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-wrap w-full h-full mr-2 mt-2">
                    <div className="w-full md:w-2/3 flex flex-col justify-start gap-8 px-2">
                        {wishlistState.map((item) => (
                            <WishlistProductCard key={item.productId} wishlistItem={item}/>
                        ))}
                        <button className="btn btn-neutral w-fit" onClick={clearWishlist}>Clear wishlist</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WishlistContainer;
