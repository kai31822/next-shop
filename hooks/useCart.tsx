import { CartProductType } from "@/app/(pages)/product/[productId]/ProductDetails";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';

type CartContext = {
    cartTotalQty: number
    cartTotalAmount: number
    cartProducts: CartProductType[] | null
    handleAddProductToCart: (product: CartProductType) => void
    handleRemoveProductFromCart: (product: CartProductType) => void
    handleCartQtyIncrease: (Product: CartProductType) => void
    handleCartQtyDecrease: (Product: CartProductType) => void
    handleClearCart: () => void
}

export const CartContext = createContext<CartContext | null>(null)

interface Props {
    [propName: string]: any
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0)
    const [cartTotalAmount, setCartTotalAmount] = useState(0)
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null)
    //test
    // console.log('qty', cartTotalQty);
    // console.log('total', cartTotalAmount);

    //
    useEffect(() => {
        const cartItems: any = localStorage.getItem('ShoppingCartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)
        setCartProducts(cProducts)
    }, [])
    //
    useEffect(() => {
        const getTotals = () => {
            if (cartProducts) {
                const { total, qty } = cartProducts?.reduce((acc, item) => {
                    const itemTotal = item.price * item.quantity
                    acc.total += itemTotal
                    acc.qty += item.quantity
                    return acc
                }, {
                    total: 0,
                    qty: 0
                })

                setCartTotalQty(qty)
                setCartTotalAmount(total)
            }
        }
        getTotals()
    }, [cartProducts])
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
    const handleClearCart = useCallback(() => {
        setCartProducts(null)
        setCartTotalQty(0)
        localStorage.setItem('ShoppingCartItems', JSON.stringify(null))
    }, [cartProducts])
    //

    //
    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart
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
