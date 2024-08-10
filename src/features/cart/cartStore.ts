import {create} from 'zustand';
import {persist} from "zustand/middleware";

export interface CartItem {
    productId: number;
    quantity: number;
}

export interface CartState {
    cart: CartItem[];
    cartNumItems: number;
    addItem: (id: number) => void;
    decreaseItem: (id: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}

const calculateTotalItems = (cart: CartItem[]) => {
    return cart.reduce((total, item) => total + item.quantity, 0);
};

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            cartNumItems: 0,
            addItem: (id: number) => set((state) => {
                const existingCartItem = state.cart.find(item => item.productId === id);
                let newCart;

                if (existingCartItem) {
                    newCart = state.cart.map(item =>
                        item.productId === id
                            ? {...item, quantity: item.quantity + 1}
                            : item
                    );
                } else {
                    newCart = [...state.cart, {productId: id, quantity: 1}];
                }

                return {
                    cart: newCart,
                    cartNumItems: calculateTotalItems(newCart),
                };
            }),
            decreaseItem: (id: number) => set((state) => {
                const existingCartItem = state.cart.find(item => item.productId === id);
                let newCart;

                if (existingCartItem) {
                    if (existingCartItem.quantity > 1) {
                        newCart = state.cart.map(item =>
                            item.productId === id
                                ? {...item, quantity: item.quantity - 1}
                                : item
                        );
                    } else {
                        newCart = state.cart.filter(item => item.productId !== id);
                    }

                    return {
                        cart: newCart,
                        cartNumItems: calculateTotalItems(newCart),
                    };
                }

                return state;
            }),
            removeFromCart: (id: number) => set((state) => {
                const newCart = state.cart.filter(item => item.productId !== id);
                return {
                    cart: newCart,
                    cartNumItems: calculateTotalItems(newCart),
                };
            }),
            clearCart: () => set(() => ({
                cart: [],
                cartNumItems: 0,
            })),
        }),
        {
            name: 'wishlist-storage',
        }
    )
);
