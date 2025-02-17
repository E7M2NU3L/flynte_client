import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Spring from '@/assets/spring.png';
import Star from '@/assets/star.png';
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export const CallToAction = () => {
  const heroRef = useRef(null);
  const {scrollYProgress} = useScroll({
    target : heroRef,
    offset : ['start end', 'end start']
  });
  const translateY = useTransform(scrollYProgress, [0,1], [150, -150]);
  return (
    <div className="bg-gradient-to-b from-background to-primary/10 py-24 overflow-x-clip">
      <section className="container px-4 md:px-0">
        <main className="max-w-3xl mx-auto relative">
        <h1 className="text-center text-4xl mt-3 md:text-5xl lg:text-6xl tracking-tight fonr-semibold bg-gradient-to-b from-foreground to-primary bg-clip-text text-transparent">Sign Up for free today</h1>
        <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010E3D] mt-5">Celebrate the joy of building a safer lifesyle as a family with our finance tracker, with your bank accounts connected <span className="text-green-500">[only if you want]</span> to our dashboard under high security.</p>

        <motion.img style={{
          translateY : translateY
        }} src={Star} alt="star" className="w-[360px] absolute -left-[350px] -top-[137px]" />
        <motion.img style={{
          translateY : translateY
        }} src={Spring} alt="spring" className="absolute w-[360px] -right-[331px] -top-[19px]" />
        </main>

        <main className="flex flex-row gap-4 justify-center items-center mt-10">
          <Button asChild variant={"default"} size={"sm"}>
            <Link to={"/sign-in"}>
              Get Started
            </Link>
          </Button>

          <Button asChild variant={"outline"} size={"sm"}>
            <Link to={"/pricing"}>
              Learn More
              <TrendingUp className="ml-1" />
            </Link>
          </Button>
        </main>
      </section>
    </div>
  );
};
