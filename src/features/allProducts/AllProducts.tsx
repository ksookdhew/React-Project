import {useQuery} from "@tanstack/react-query";
import {getAllCategories, getAllProducts} from "../../services/api.ts";
import ProductCard from "./ProductCard.tsx";

const AllProducts = () => {
    const allProducts = useQuery({queryKey: ['allProducts'], queryFn: getAllProducts})
    const categories = useQuery({queryKey: ['categories'], queryFn: getAllCategories})

    return (
        <div className="p-4">
            <div className="carousel carousel-center w-full space-x-4 self-center">
                {
                    categories.data?.map((category) => (
                        <div className="carousel-item">
                        <button className="btn w-44">{category.toUpperCase()}</button>
                        </div>
                    ))
                }
            </div>
            <div className="flex flex-wrap gap-4 p-4 justify-center overflow-y-auto">
                {
                    allProducts.data?.map(product => (<ProductCard key={product.id} product={product}/>))
                }
            </div>
        </div>
    );
}

export default AllProducts;