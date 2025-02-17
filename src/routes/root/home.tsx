import { CallToAction } from "@/components/root/home/CallToAction"
import { LogoTicker } from "@/components/root/home/LogoTicker"
import { ProductShowcase } from "@/components/root/home/ProductShowcase"
import Hero from "@/components/root/home/hero"
import { Pricing } from "@/components/root/home/pricing"
import { Testimonials } from "@/components/root/home/testimonials"

const Home = () => {
  return (
    <div>
        <Hero />
        <LogoTicker />
        <ProductShowcase />
        <Pricing />
        <Testimonials />
        <CallToAction />
    </div>
  )
}

export default Home