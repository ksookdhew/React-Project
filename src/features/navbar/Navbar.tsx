// import {Outlet} from "react-router-dom";
import AllProducts from "../allProducts/AllProducts.tsx";

const Navbar = () => {
    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-accent w-full px-4">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 text-xl">SHOP</div>
                    <div className="hidden flex-none lg:block">
                        <ul className="menu menu-horizontal">
                            {/* Navbar menu content here */}
                            <li><a>Wishlist</a></li>
                            <li><a>Cart</a></li>
                        </ul>
                    </div>
                </div>
                <AllProducts/>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-accent min-h-full w-80 p-4">
                    <li><a>Wishlist</a></li>
                    <li><a>Cart</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar