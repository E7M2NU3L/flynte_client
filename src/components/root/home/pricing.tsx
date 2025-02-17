import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { twMerge } from "tailwind-merge"; 

const pricingTiers = [
  {
    title: "Free",
    monthlyPrice: 0,
    buttonText: "Get started for free",
    popular: false,
    inverse: false,
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "2GB storage",
      "Integrations",
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
      "Up to 50 project members",
      "Unlimited tasks and projects",
      "50GB storage",
      "Integrations",
      "Priority support",
      "Advanced support",
      "Export support",
    ],
  },
  {
    title: "Business",
    monthlyPrice: 19,
    buttonText: "Sign up now",
    popular: false,
    inverse: false,
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "200GB storage",
      "Integrations",
      "Dedicated account manager",
      "Custom fields",
      "Advanced analytics",
      "Export capabilities",
      "API access",
      "Advanced security features",
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
            <div className={twMerge("p-10 rounded-3xl w-full shadow-[0_7px_14px_#EAEAEA] dark:shadow-primary border border-[#F1F1F1] dark:border-none", inverse === true && 'border-black bg-black text-white')} key={index}>
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
                  <li key={feature} className="flex flex-row gap-4 text-sm items-center">
                    <CheckIcon />
                    <span>{feature}</span>
                    </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
