import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Assuming `cn` is your utility for className concatenation
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] overflow-hidden px-4 md:px-0 max-w-7xl mx-auto">
      {/* Background Pattern */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.3}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "absolute inset-0 h-full w-full skew-y-12"
        )}
      />
      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[90vh] h-full">
        <main className="flex flex-col justify-center gap-3 items-center text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-6xl font-semibold tracking-tight leading-tight text-foreground">
            Flynte -- Ease your Financial Tracking with Family
          </h1>
          <p className="text-lg text-muted-foreground leading-tight tracking-tight font-medium">
          Track Budgets, Manage Transactions, and Gain Insights with a Unified Financial Management Solution.
          </p>

          <main className="flex flex-row justify-center items-center gap-4 text-center">
            <Button variant={"default"} size={"sm"} asChild>
              <Link to={"/login"}>
                Get Started
              </Link>
            </Button>
            <Button variant={"outline"} size={"sm"} asChild>
              <Link to={"/register"}>
                Start for Free
              </Link>
            </Button>
          </main>
        </main>
      </div>
    </div>
  );
};

export default Hero;
