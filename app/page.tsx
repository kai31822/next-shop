import Container from "./components/ui/Container";
import HomeBanner from "./components/ui/Nav/HomeBanner";
//test data
import { products } from '@/lib/producttest'
import ProductCard from "./components/ui/product/ProductCard";
export default function Home() {
    return (
        <div className="p-8">
            <Container>
                <div>
                    <HomeBanner></HomeBanner>
                </div>
                {/* list products */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                    {products.map((product: any,index) => {
                        return <ProductCard data={product} key={index}></ProductCard>
                    })}
                </div>
            </Container>
        </div>
    )
}
