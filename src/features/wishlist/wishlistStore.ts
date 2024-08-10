import { create } from 'zustand';

export interface WishlistItem {
    productId: number;
}

export interface WishlistState {
    wishlist: WishlistItem[];
    addToWishlist: (id: number) => void;
    removeFromWishlist: (id: number) => void;
    clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>((set) => ({
    wishlist: [],
    addToWishlist: (id: number) => set((state) => {
        const existingWishlistItem = state.wishlist.find(item => item.productId === id);

        let newWishlist;

        if (!existingWishlistItem) {
            newWishlist = [...state.wishlist, { productId: id }];
        } else {
            // If the item already exists, no change is needed
            newWishlist = state.wishlist;
        }

        return {
            wishlist: newWishlist,
        };
    }),
    removeFromWishlist: (id: number) => set((state) => {
        const newWishlist = state.wishlist.filter(item => item.productId !== id);
        return {
            wishlist: newWishlist,
        };
    }),
    clearWishlist: () => set(() => ({
        wishlist: [],
    }))
}));
