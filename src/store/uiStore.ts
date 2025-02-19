import {create} from "zustand/react";


interface stateUiStore{
    isMenuOpen: boolean;
    openMenu: () => void;
    closeMenu: () => void;
}

export const useUiStore = create<stateUiStore>((set)=>({
    isMenuOpen: false,
    openMenu: () => set({isMenuOpen: true}),
    closeMenu: () => set({isMenuOpen: false})
}))