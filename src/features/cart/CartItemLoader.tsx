const CartItemLoader = () => {
    return (
        <div className="card card-side bg-base-100 shadow-xl w-full">
            <div className="skeleton h-40 w-32 self-center mx-4"></div>
            <div className="card-body">
                <div className="card-body mb-10 flex flex-col gap-4">
                    <div className="skeleton h-4 w-52"></div>
                    <div className="skeleton h-4 w-28"></div>
                </div>
            </div>
        </div>
    );
}
export default CartItemLoader;