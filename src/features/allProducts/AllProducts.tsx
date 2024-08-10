import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {getAllCategories, getAllProducts, getProductInCategory} from "../../services/api.ts";
import ProductCard from "./ProductCard.tsx";
import {Product} from "../../models/Products.ts";
import ProductCardLoader from "./ProductCardLoader.tsx";
import AppError from "../error/AppError.tsx";

const AllProducts = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const allProductsQuery = useQuery<Product[]>({
        queryKey: ['allProducts'],
        queryFn: getAllProducts,
        enabled: !selectedCategory
    });

    const categoriesQuery = useQuery<string[]>({
        queryKey: ['categories'],
        queryFn: getAllCategories
    });

    const productsInCategoryQuery = useQuery<Product[]>({
        queryKey: ['productsInCategory', selectedCategory],
        queryFn: () => getProductInCategory(selectedCategory!),
        enabled: !!selectedCategory
    });

    if (allProductsQuery.isLoading || categoriesQuery.isLoading || (selectedCategory && productsInCategoryQuery.isLoading)) {
        return (
            <div className="p-4">
                <div className="flex flex-wrap gap-4 p-4 justify-start overflow-y-auto">
                    {
                        Array.from({length: 10}).map((_, index) => (
                            <ProductCardLoader key={index}/>
                        ))
                    }
                </div>
            </div>
        );
    }

    if (allProductsQuery.error || categoriesQuery.error || productsInCategoryQuery.error) {
        return <AppError/>;
    }

    const products: Product[] = selectedCategory ? productsInCategoryQuery?.data ?? [] : allProductsQuery?.data ?? [];

    return (
        <div className="p-4">
            <div className="carousel carousel-center w-full space-x-4 self-center">
                <div className="carousel-item" key={"AllProducts"}>
                    <button className={`btn w-44 ${selectedCategory === null ? 'btn-neutral' : ''}`}
                            onClick={() => setSelectedCategory(null)}>
                        ALL
                    </button>
                </div>
                {
                    categoriesQuery.data?.map((category) => (
                        <div className="carousel-item" key={category}>
                            <button
                                className={`btn w-44 ${selectedCategory === category ? 'btn-neutral' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category.toUpperCase()}
                            </button>
                        </div>
                    ))
                }
            </div>
            <div className="flex flex-wrap gap-4 p-4 justify-start overflow-y-auto">
                {
                    products.map(product => (<ProductCard key={product.id} product={product}/>))
                }
            </div>
        </div>
    );
}

export default AllProducts;
