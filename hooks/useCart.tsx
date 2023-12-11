import { CartProductType } from "@/app/(pages)/product/[prouductId]/ProductDetails";
import { product } from "@/lib/producttest";
import { Product } from "@prisma/client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';

type CartContext = {
    cartTotalQty: number
    cartProducts: CartProductType[] | null
    handleAddProductToCart: (product: CartProductType) => void
    handleRemoveProductFromCart: (product: CartProductType) => void
    handleCartQtyIncrease: (Product: CartProductType) => void
    handleCartQtyDecrease: (Product: CartProductType) => void
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
    //CartQtyIncrease
    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        let updateCart
        if (product.quantity === 5) {
            return toast.error('oops! Maximum reached')
        }
        if (cartProducts) {
            updateCart = [...cartProducts]
            const existingIndex = cartProducts.findIndex((item) => {
                return item.id === product.id
            })
            if (existingIndex > -1) {
                updateCart[existingIndex].quantity = ++updateCart[existingIndex].quantity
            }
            setCartProducts(updateCart)
            localStorage.setItem('ShoppingCartItems', JSON.stringify(updateCart))
        }
    }, [cartProducts])
    //CartQtyDecrease
    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        let updateCart
        if (product.quantity === 1) {
            return toast.error('oops! Minimum reached')
        }
        if (cartProducts) {
            updateCart = [...cartProducts]
            const existingIndex = cartProducts.findIndex((item) => {
                return item.id === product.id
            })
            if (existingIndex > -1) {
                updateCart[existingIndex].quantity = --updateCart[existingIndex].quantity
            }
            setCartProducts(updateCart)
            localStorage.setItem('ShoppingCartItems', JSON.stringify(updateCart))
        }
    }, [cartProducts])
    //
    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease
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
