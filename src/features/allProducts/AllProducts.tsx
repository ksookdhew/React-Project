import {useQuery} from "@tanstack/react-query";
import {getAllProducts} from "../../services/api.ts";
import ProductCard from "./ProductCard.tsx";

const AllProducts = () => {
    const allProducts = useQuery({ queryKey: ['allProducts'], queryFn: getAllProducts })

    return (
        <div className="flex flex-wrap gap-4 p-4 justify-center" style={{ overflowY: 'auto' }}>
            {
                allProducts.data?.map(product => (<ProductCard key={product.id} product={product} />))
            }
        </div>
    );
}

export default AllProducts;