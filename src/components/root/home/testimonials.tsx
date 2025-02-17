import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import avatar5 from "@/assets/avatar-5.png";
import avatar6 from "@/assets/avatar-6.png";
import avatar7 from "@/assets/avatar-7.png";
import avatar8 from "@/assets/avatar-8.png";
import avatar9 from "@/assets/avatar-9.png";
import { twMerge } from "tailwind-merge";

const testimonials = [
  {
    text: "As a seasoned designer always on the lookout for innovative tools, Framer.com instantly grabbed my attention.",
    imageSrc: avatar1,
    name: "Jamie Rivera",
    username: "@jamietechguru00",
  },
  {
    text: "Our team's productivity has skyrocketed since we started using this tool. ",
    imageSrc: avatar2,
    name: "Josh Smith",
    username: "@jjsmith",
  },
  {
    text: "This app has completely transformed how I manage my projects and deadlines.",
    imageSrc: avatar3,
    name: "Morgan Lee",
    username: "@morganleewhiz",
  },
  {
    text: "I was amazed at how quickly we were able to integrate this app into our workflow.",
    imageSrc: avatar4,
    name: "Casey Jordan",
    username: "@caseyj",
  },
  {
    text: "Planning and executing events has never been easier. This app helps me keep track of all the moving parts, ensuring nothing slips through the cracks.",
    imageSrc: avatar5,
    name: "Taylor Kim",
    username: "@taylorkimm",
  },
  {
    text: "The customizability and integration capabilities of this app are top-notch.",
    imageSrc: avatar6,
    name: "Riley Smith",
    username: "@rileysmith1",
  },
  {
    text: "Adopting this app for our team has streamlined our project management and improved communication across the board.",
    imageSrc: avatar7,
    name: "Jordan Patels",
    username: "@jpatelsdesign",
  },
  {
    text: "With this app, we can easily assign tasks, track progress, and manage documents all in one place.",
    imageSrc: avatar8,
    name: "Sam Dawson",
    username: "@dawsontechtips",
  },
  {
    text: "Its user-friendly interface and robust features support our diverse needs.",
    imageSrc: avatar9,
    name: "Casey Harper",
    username: "@casey09",
  },
];

const firstColumn = testimonials.slice(0,3);
const secondColumn = testimonials.slice(3,6);
const thirdColumn = testimonials.slice(6.9);

export const Testimonials = () => {
  return (
    <div className="px-4 py-12">
      <div className="container bg-background py-0">
        <main className="max-w-2xl mx-auto text-center">
          <div className="inline-flex px-4 py-1 border text-sm">Testimonials</div>
          <h2 className="text-center text-4xl mt-3 md:text-5xl lg:text-6xl tracking-tight fonr-semibold bg-gradient-to-b from-foreground to-primary bg-clip-text text-transparent">What our users Say</h2>
          <p className="text-center text-[22px] leading-[30px] tracking-tight text-muted-foreground mt-5">From a simple finance tracker to integrations and AI support features, our app has become one of the favourites amongst the financially alertive families..</p>
        </main>

        <main className="flex justify-center gap-6">
          <Card testimonials={firstColumn} />
          <Card testimonials={secondColumn} className="hidden md:flex" />
          <Card testimonials={thirdColumn} className="hidden lg:flex" />
        </main>
      </div>
    </div>
  );
};

const Card = (props : {testimonials : typeof testimonials, className? : string}) => {
  return (
    <div className={twMerge("flex flex-col gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]", props.className)}>
          {props.testimonials.map(({text, imageSrc, name, username}, index) => (
            <div className="p-10 rounded-3xl w-full shadow-[0_7px_14px_#EAEAEA] dark:shadow-primary border border-[#F1F1F1] dark:border-none" key={index}>
              <div>{text}</div>
              <div className="flex items-center gap-2 mt-5">
                <img src={imageSrc} alt={name} className="rounded-full w-10 h-10" />
                <div>
                  <div className="font-medium tracking-tight leading-[20px]">{name}</div>
                  <div className="leading-5 tracking-tight">{username}</div>
                </div> 
              </div>
            </div>
          ))}
        </div>
  )
}