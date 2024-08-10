const ProductDetailsLoader = () => {
    return (
        <div className="flex w-full  h-full justify-center p-8 mt-10">
            <div className="flex w-full md:w-3/4 flex-col gap-4">
                <div className="skeleton h-80 w-full"></div>
                <div className="skeleton h-6 w-28"></div>
                <div className="skeleton h-6 w-full"></div>
                <div className="skeleton h-6 w-full"></div>
            </div>
        </div>
    );
}
export default ProductDetailsLoader;