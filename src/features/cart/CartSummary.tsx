const CartSummary = ({total, numItems}: { total: string, numItems: number }) => {
    return (
        <div className="card bg-neutral text-neutral-content w-full max-w-96 px-4 h-52">
            <div className="card-body gap-4">
                <h2 className="card-title">Cart Summary</h2>
                <div className="flex justify-between">
                    <h3 className="text-xl">Total({numItems} items)</h3>
                    <h3 className="text-3xl">{total}</h3>
                </div>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Checkout</button>
                </div>
            </div>
        </div>
    );
}

export default CartSummary;