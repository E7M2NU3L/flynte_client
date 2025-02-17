import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Cylinder from '@/assets/cylinder.png';
import Noodle from '@/assets/noodle.png'; 
import {motion, useScroll, useTransform} from 'framer-motion';
import { useRef } from "react";

const Hero = () => {
  const heroRef = useRef(null);
  const {scrollYProgress} = useScroll({
    target : heroRef,
    offset : ['start end', 'end start']
  });
  const translateY = useTransform(scrollYProgress, [0,1], [150, -150]);
  const subtitle = "Track expenses, manage family budgets, and get AI-driven insights—all in one place. Build a stronger, more transparent financial future together with Flynte.";
  return (
    <main ref={heroRef} className="bg-gradient-to-tr from-primary/70 via-transparent to-transparent">
      <div className="min-h-[90vh] px-4 md:px-0 gap-12 w-full grid grid-cols-1 md:grid-cols-2  text-center md:text-start max-w-7xl mx-auto pb-12">
      <section className="pt-12 space-y-4 place-content-center max-w-xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight fonr-semibold bg-gradient-to-b from-foreground to-primary bg-clip-text text-transparent">Smart <span className="bg-clip-text bg-gradient-to-tr from-primary via-violet-600 to-purple-600 text-transparent">Family Finance,</span> Simplified</h1>
        <p className="text-[22px] leading-[30px] tracking-tight text-[#010E3D]">{subtitle}</p>

        <main className="flex flex-row gap-4 justify-center items-center md:justify-start">
          <Button asChild variant={"default"} size={"sm"}>
            <Link to={"/sign-in"}>
              Get Started
            </Link>
          </Button>

          <Button asChild variant={"outline"} size={"sm"}>
            <Link to={"/pricing"}>
              Learn More
            </Link>
          </Button>
        </main>
      </section>
      <section className="place-content-center relative">
        <div className="relative">
        <motion.img
          animate={{
            translateY: [-20,20],
          }}
          transition={{
            repeat: Infinity,
            repeatType : "mirror",
            duration : 3,
            ease:"easeInOut"
          }}
          src="/hero.png" alt="hero1" className="h-full w-full" /> 
        </div>
        <motion.img src={Cylinder} alt="cylinder" style={{
          translateY : translateY
        }} className="hidden md:block -top-8 -left-32 absolute h-[220px] w-[220px]" />
        <motion.img src={Noodle} style={{
          translateY : translateY
        }} alt="cylinder" className="hidden md:block top-[524px] left-[448px] rotate-[300deg] absolute h-[220px] w-[220px]" />
      </section>
    </div>
    </main>
  );
};

export default Hero;