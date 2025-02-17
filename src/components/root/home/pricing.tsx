import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import {motion} from 'framer-motion'; 

const pricingTiers = [
  {
    title: "Free",
    monthlyPrice: 0,
    buttonText: "Get started for free",
    popular: false,
    inverse: false,
    features: [
      "Up to 2 family profiles",
      "Track income & expenses",
      "Basic budgeting tools",
      "AI-powered financial insights",
      "Limited transaction history (3 months)",
      "Basic support",
    ],
  },
  {
    title: "Pro",
    monthlyPrice: 9,
    buttonText: "Sign up now",
    popular: true,
    inverse: true,
    features: [
      "Up to 5 family profiles",
      "Unlimited income & expense tracking",
      "Advanced budgeting tools",
      "AI-powered financial forecasting",
      "Full transaction history",
      "Bank account & credit card integration",
      "Automated bill reminders",
      "Priority support",
    ],
  },
  {
    title: "Business",
    monthlyPrice: 19,
    buttonText: "Sign up now",
    popular: false,
    inverse: false,
    features: [
      "Unlimited family profiles",
      "Comprehensive budgeting & financial planning",
      "AI-driven savings & investment recommendations",
      "Custom financial goals & tracking",
      "Full transaction history with export capabilities",
      "Bank account & credit card integration",
      "Automated bill reminders & payment scheduling",
      "Shared family financial dashboard",
      "Advanced security & fraud alerts",
      "Dedicated account manager",
      "API access for financial data",
    ],
  },
];


export const Pricing = () => {
  return (
    <div className="py-24 px-4">
      <div className="container">
        <h1 className="text-center text-4xl mt-3 md:text-5xl lg:text-6xl tracking-tight fonr-semibold bg-gradient-to-b from-foreground to-primary bg-clip-text text-transparent">Pricing Plans</h1>
        <p className="text-center text-[22px] leading-[30px] tracking-tight text-muted-foreground mt-5">Free forever, Upgrade for unlimited tracking, better security, linking bank accounts and other integrations..</p>

        <div className="flex flex-col mt-10 md:flex-row gap-6 items-center">
          {pricingTiers.map(({title, monthlyPrice, buttonText, popular, inverse, features}, index) => (
            <motion.div initial={{
              y: 40,
              opacity: 0,
            }}
              whileInView={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.5, delay: index * 0.3 }
              }}
            className={twMerge("p-10 rounded-3xl w-full shadow-[0_7px_14px_#EAEAEA] dark:shadow-primary border border-[#F1F1F1] dark:border-none", inverse === true && 'border-black bg-black text-white')} key={index}>
              <div className="flex justify-between">
              <h3 className={twMerge("text-lg font-bold text-foreground", inverse === true && 'text-white')}>{title}</h3>
              {popular && (
                <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-muted-foreground">
                <span className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#DD7DDF)] text-transparent bg-clip-text font-medium">Polular</span>
              </div>
              )}
              </div>
              <div className="flex items-baseline gap-1 mt-[30px]">
                <span className="text-4xl font-bold tracking-tighter leading-none">${monthlyPrice}</span>
                <span className="tracking-tight font-bold text-muted-foreground">/Month</span>
              </div>
              <Button className="w-full mt-[30px]" variant={"default"} size={"sm"}>{buttonText}</Button>
              <ul className="flex flex-col gap-5 mt-[32px]">
                {features.map(feature => (
                  <li key={feature} className="flex flex-row gap-4 text-xs items-center">
                    <CheckIcon />
                    <span>{feature}</span>
                    </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
