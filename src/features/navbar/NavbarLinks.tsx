import {Link} from "react-router-dom";
import {LuHeart, LuShoppingCart} from "react-icons/lu";
import {useCartStore} from "../cart/cartStore.ts";

const NavbarLinks = ({closeDrawer}: { closeDrawer: () => void }) => {
    const totalNumItems = useCartStore((state) => state.cartNumItems);

    return (
        <>
            <li>
                <Link to="suggest" onClick={closeDrawer}>
                    Suggest a Product
                </Link>
            </li>
            <li>
                <Link to="wishlist" onClick={closeDrawer} aria-label="Wishlist">
                    <LuHeart/>
                    <span className="text-md">Wishlist</span>
                </Link>
            </li>
            <li>
                <Link to="cart" onClick={closeDrawer} aria-label="Cart">
                    <LuShoppingCart/>
                    {totalNumItems > 0 && (
                        <span className="text-md">Cart: {totalNumItems}</span>
                    )}
                </Link>
            </li>
        </>
    );
};

export default NavbarLinks;
