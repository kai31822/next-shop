//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl

const formatPrice = (amount: number) => {
    return (
        // new Intl.NumberFormat(
        //     'en-US', {
        //     style: 'currency',
        //     currency: 'USD'
        // }).format(amount)
        new Intl.NumberFormat(
            'zh-TW', {
            style: 'currency',
            currency: 'NTD',
            maximumFractionDigits: 0
        }).format(amount)
    )
}

export default formatPrice
