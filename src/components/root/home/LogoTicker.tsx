import acmeLogo from '../../../assets/logo-acme.png';
import quantomLogo from '../../../assets/logo-quantum.png';
import echoLogo from '../../../assets/logo-echo.png';
import celestialLogo from '../../../assets/logo-celestial.png';
import pulseLogo from '../../../assets/logo-pulse.png';
import apexLogo from '../../../assets/logo-apex.png';
import { motion } from 'framer-motion';
import React from 'react';

const logos = [
  { name: "Quantum", image: quantomLogo },
  { name: "Acme Corp", image: acmeLogo },
  { name: "Echo Valley", image: echoLogo },
  { name: "Pulse", image: pulseLogo },
  { name: "Apex", image: apexLogo },
  { name: "Celestial", image: celestialLogo },
];

export const LogoTicker = () => {
  return (
    <div className="py-20 bg-background">
      <div className="container">
        <div className="overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div
            className="flex gap-14 pr-14 flex-none"
            animate={{ x: "-50%" }}
            transition={{
              ease: "linear",
              duration: 20,
              repeat: Infinity,
              repeatType : 'loop'
            }}
          >
            {/* Duplicating logos for seamless looping */}
           {Array.from({length : 2}).map((_, index) => (
            <React.Fragment key={index}>
              {logos.map((logo, index) => (
                <img
                  key={index}
                  className="logo-ticker-image"
                  src={logo.image}
                  alt={logo.name}
                />
              ))}
            </React.Fragment>
           ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
