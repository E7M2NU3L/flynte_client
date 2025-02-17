import Pyramid from '@/assets/pyramid.png';
import Tube from '@/assets/tube.png';

export const ProductShowcase = () => {
  return <div className="bg-gradient-to-b from-background to-primary px-4 py-24 min-h-screen">
    <div className="container">
      <div className="max-w-3xl mx-auto">
      <div className="flex justify-center flex-col items-center">
      <div className="text-sm inline-flex max-w-[10vh] border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight">Simplify</div>
      <h1 className="text-center text-4xl mt-3 md:text-5xl lg:text-6xl tracking-tight fonr-semibold bg-gradient-to-b from-foreground to-primary bg-clip-text text-transparent">Effective Finance Tracking Experience</h1>
      <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010E3D] mt-5">A More Effective and Simple way to manage your budgets as a family or a team, add members, accounts and track em all..</p>
      </div>
      </div>

      <main className="relative">
        <img src="/product.png" alt="product" className="mt-10" />
        <img src={Pyramid} alt="pyramid" className="absolute h-[200px] w-[200px] md:h-[262px] md:w-[262px] -right-36 -top-32" />
        <img src={Tube} alt="pyramid" className="md:h-[248px] h-[150px] absolute -left-36 bottom-24" />
      </main>
    </div>
  </div>;
};
