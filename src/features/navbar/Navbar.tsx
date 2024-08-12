import {Link, Outlet} from "react-router-dom";
import {MdClose} from "react-icons/md";
import {useRef} from "react";
import NavbarLinks from "./NavbarLinks.tsx";

const Navbar = () => {
    const drawerRef = useRef<HTMLInputElement>(null);

    const closeDrawer = () => {
        if (drawerRef.current) {
            drawerRef.current.checked = false;
        }
    };

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" ref={drawerRef}/>
            <div className="drawer-content flex flex-col">
                <div className="navbar bg-neutral text-neutral-content w-full px-4">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 text-xl">
                        <Link to="/">SHOP</Link>
                    </div>
                    <div className="hidden flex-none lg:block px-8">
                        <ul className="menu menu-horizontal text-xl">
                            <NavbarLinks closeDrawer={closeDrawer}/>
                        </ul>
                    </div>
                </div>
                <Outlet/>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-neutral text-neutral-content min-h-full w-80 p-4 text-3xl">
                    <li className="flex justify-end">
                        <button
                            aria-label="close sidebar"
                            className="btn btn-square btn-ghost text-xl self-end"
                            onClick={closeDrawer}
                        >
                            <MdClose/>
                        </button>
                    </li>
                    <NavbarLinks closeDrawer={closeDrawer}/>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
