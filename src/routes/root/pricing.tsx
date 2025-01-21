import Cta from "@/components/root/home/cta"
import Faq from "@/components/root/pricing/faq"
import PricingCards from "@/components/root/pricing/price-cards"

const Pricing = () => {
  return (
    <div>
        <PricingCards />
        <Faq />
        <Cta />
    </div>
  )
}

export default Pricing