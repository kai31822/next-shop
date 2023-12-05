import Container from "./components/ui/Container";
import HomeBanner from "./components/ui/Nav/HomeBanner";

export default function Home() {
    return (
        <div className="p-8">
            <Container>
                <div>
                    <HomeBanner></HomeBanner>
                </div>
                <p>homepage</p>
            </Container>
        </div>
    )
}
