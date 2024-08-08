import {create} from 'zustand';

export interface CartItem {
    productId: number;
    quantity: number;
}

export interface CartState {
    cart: CartItem[];
    addItem: (id: number) => void;
    decreaseItem: (id: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    cart: [],
    addItem: (id: number) => set((state) => {
        const existingCartItem = state.cart.find(item => item.productId === id);
        if (existingCartItem) {
            return {
                cart: state.cart.map(item =>
                    item.productId === id
                        ? {...item, quantity: item.quantity + 1}
                        : item
                )
            };
        } else {
            return {
                cart: [...state.cart, {productId: id, quantity: 1}]
            };
        }
    }),
    decreaseItem: (id: number) => set((state) => {
        const existingCartItem = state.cart.find(item => item.productId === id);
        if (existingCartItem) {
            if (existingCartItem.quantity > 1) {
                return {
                    cart: state.cart.map(item =>
                        item.productId === id
                            ? {...item, quantity: item.quantity - 1}
                            : item
                    )
                };
            } else {
                return {
                    cart: state.cart.filter(item => item.productId !== id)
                };
            }
        }
        return state;
    }),
    removeFromCart: (id: number) => set((state) => ({
        cart: state.cart.filter(item => item.productId !== id)
    })),
    clearCart: () => set(() => ({
        cart: []
    }))
}));
