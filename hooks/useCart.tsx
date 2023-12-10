import { CartProductType } from "@/app/(pages)/product/[prouductId]/ProductDetails";
import { product } from "@/lib/producttest";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';

type CartContext = {
    cartTotalQty: number
    cartProducts: CartProductType[] | null
    handleAddProductToCart: (product: CartProductType) => void
    handleRemoveProductFromCart: (product: CartProductType) => void
}

export const CartContext = createContext<CartContext | null>(null)

interface Props {
    [propName: string]: any
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0)
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null)
    //
    useEffect(() => {
        const cartItems: any = localStorage.getItem('ShoppingCartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)
        setCartProducts(cProducts)
    }, [])
    //receive a value of product  : addproduct
    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updateCart;
            if (prev) {
                updateCart = [...prev, product]
            } else {
                updateCart = [product]
            }
            //toast
            toast.success("Product added to cart")
            //localstorage
            localStorage.setItem('ShoppingCartItems', JSON.stringify(updateCart))
            return updateCart
        })
    }, [])
    //remove product
    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        if (cartProducts) {
            const filteredProducts = cartProducts.filter((item) => {
                return item.id !== product.id
            })
            setCartProducts(filteredProducts)
            //toast
            toast.success("Product Remove")
            //localstorage
            localStorage.setItem('ShoppingCartItems', JSON.stringify(filteredProducts))


        }
    }, [cartProducts])

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart
    }
    return <CartContext.Provider value={value} {...props} />
}


export const useCart = () => {
    const context = useContext(CartContext)
    if (context === null) {
        throw new Error("useCart must be used within a CartContextProvider")
    }
    return context
}
