import { CallToAction } from "@/components/root/home/CallToAction"
import Faq from "@/components/root/pricing/faq"
import PricingCards from "@/components/root/pricing/price-cards"

const Pricing = () => {
  return (
    <div>
        <PricingCards />
        <Faq />
        <CallToAction />
    </div>
  )
}

export default Pricing