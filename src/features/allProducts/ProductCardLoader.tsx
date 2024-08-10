const ProductCardLoader = () => {
    return (
        <div className="card bg-base-100 w-80 h-96 shadow-xl flex flex-col gap-4">
            <div className="skeleton h-56 w-3/4 self-center mt-10"></div>
            <div className="card-body mb-10  flex flex-col gap-4">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-28"></div>
            </div>
        </div>
    );
}
export default ProductCardLoader;