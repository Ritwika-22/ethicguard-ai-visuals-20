
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";
import ScoreInfoPopover from '../ScoreInfoPopover';

// Helper for the "Before" gradient inline
const GradientBefore = () => (
  <span
    className="bg-gradient-to-r from-ethic-green to-blue-500 bg-clip-text text-transparent"
    style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
  >
    Before
  </span>
);

const HeroSection = () => {
  return (
    <div className="bg-[#f9fbfc] min-h-[630px] flex items-center justify-center pt-12 pb-12 px-4 md:px-0">
      <div className="container mx-auto flex flex-col md:flex-row items-center max-w-7xl">
        {/* Left TEXT */}
        <div className="flex-1 flex flex-col items-start justify-center">
          <h1 className="text-[2.5rem] sm:text-[3.4rem] md:text-[4.1rem] leading-[1.1] font-extrabold mb-4 text-[#1A2530]">
            Test AI <GradientBefore /> It<br />Tests You
          </h1>
          <p className="text-lg md:text-xl text-[#363d4d] mb-10 max-w-xl">
            EthicGuard helps you deploy AI with confidence by testing for ethical issues, privacy concerns, and bias before your models go live.
          </p>
          <div className="flex flex-row gap-4 w-full flex-wrap">
            <Button
              asChild
              className="bg-ethic-green hover:bg-ethic-green/90 text-ethic-navy text-lg font-bold px-8 py-4 rounded-lg min-w-[200px] transition-all border-none shadow-none"
              style={{ boxShadow: 'none' }}
            >
              <Link to="/workspace">
                Open Workspace
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-2 border-[#1A2530] text-[#1A2530] hover:bg-gray-100 px-8 py-4 text-lg font-semibold bg-white min-w-[200px] transition-all"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              How It Works <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
        {/* Right IMAGE/CARD */}
        <div className="flex-1 flex items-center justify-center mt-12 md:mt-0">
          {/* Outer background shadow/gradient */}
          <div className="relative w-[430px] max-w-full h-[325px]">
            <div className="absolute -top-5 -left-5 w-full h-full rounded-2xl bg-ethic-green/10 blur-[2px]" style={{ zIndex: 1 }} />
            <div className="relative bg-white rounded-2xl shadow-[0_8px_36px_0_rgba(49,73,111,.065)] border border-[#e8ecf5] overflow-hidden z-10 flex flex-col h-full">
              {/* Card grid mimic */}
              <div className="grid grid-cols-2 gap-5 p-5 pb-4">
                {/* 4 grid boxes mimic input fields */}
                <div className="bg-[#f2f4f9] rounded-lg h-[42px] flex flex-col justify-center p-3">
                  <div className="h-3 w-1/2 bg-[#e4e7ee] rounded-full mb-1" />
                  <div className="h-4 w-2/3 bg-[#e9e9eb] rounded-md" />
                </div>
                <div className="bg-[#f2f4f9] rounded-lg h-[42px] flex flex-col justify-center p-3">
                  <div className="h-3 w-[70%] bg-[#e4e7ee] rounded-full mb-1" />
                  <div className="h-4 w-3/4 bg-ethic-green/20 rounded-md" />
                </div>
                <div className="bg-[#f2f4f9] rounded-lg h-[42px] flex flex-col justify-center p-3">
                  <div className="h-3 w-2/3 bg-[#e4e7ee] rounded-full mb-1" />
                  <div className="h-4 w-[80%] bg-blue-200/30 rounded-md" />
                </div>
                <div className="bg-[#f2f4f9] rounded-lg h-[42px] flex flex-col justify-center p-3">
                  <div className="h-3 w-1/2 bg-[#e4e7ee] rounded-full mb-1" />
                  <div className="h-4 w-[60%] bg-[#ececec] rounded-md" />
                </div>
              </div>
              {/* Card footer, dark block */}
              <div className="px-5 py-4 bg-[#232b36] text-white rounded-b-2xl flex items-center justify-between mt-auto">
                <span className="font-semibold text-base">
                  AI Model Ethics Score
                </span>
                <ScoreInfoPopover score={98} max={100} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
