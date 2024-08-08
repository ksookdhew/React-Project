import {CartItem} from "./cartStore.ts";
import {useQuery} from "@tanstack/react-query";
import {getProductWithId} from "../../services/api.ts";
import {formattedPrice} from "../../utils/productUtils.ts";

const CartProductCard = ({cartItem}: {cartItem:CartItem}) => {
    const productQuery = useQuery({queryKey: [cartItem.productId], queryFn: () => getProductWithId(`${cartItem.productId}` ?? '')})


    if (productQuery.isPending) return <div>Loading...</div>

    if (productQuery.error) return <div>Error: {productQuery.error.message}</div>

    const product = productQuery.data
    return(
        <div className="card card-side bg-base-100 shadow-xl w-full md:w-1/2">
            <figure className="w-32">
                <img
                    className={"w-full"}
                    src= {product?.image}
                    alt="Product"/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{product?.title}</h2>
                <p>{formattedPrice(product?.price)}</p>
                <div className="card-actions justify-end w-fit">
                    <button className="btn btn-primary btn-sm" >-</button>
                    <p className="self-center text-2xl">{cartItem.quantity} </p>
                    <button className="btn btn-primary btn-sm">+</button>
                </div>
            </div>
        </div>
    );
}

export default CartProductCard;