
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Color map for risk levels
const riskStyleMap = {
  "Low Risk": {
    label: "Low Risk",
    bg: "bg-[#E8FCEB]",
    text: "text-[#0C8854]",
  },
  "Medium Risk": {
    label: "Medium Risk",
    bg: "bg-[#FEF7CD]",
    text: "text-[#CC7700]",
  },
  "High Risk": {
    label: "High Risk",
    bg: "bg-[#FEECEC]",
    text: "text-[#B91C1C]",
  },
};

export default function ShadowModeTester() {
  const [inputText, setInputText] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  // For simplicity, simulate fixed responses on "Run Test"
  const [results, setResults] = useState<null | {
    humanDecision: string;
    aiDecision: string;
    riskLevel: "Low Risk" | "Medium Risk" | "High Risk";
    riskDescription: string;
  }>(null);

  const handleRunTest = () => {
    if (!inputText.trim()) {
      return;
    }
    setIsRunning(true);

    setTimeout(() => {
      let humanDecision = "Reviewed and processed by human – appears ok.";
      let aiDecision = "AI automated result – flagged for potential review.";
      let riskLevel: "Low Risk" | "Medium Risk" | "High Risk" = "Low Risk";
      let riskDescription = "No risk detected";

      if (inputText.toLowerCase().includes("hate")) {
        aiDecision = "AI automated result – rejected for hate speech.";
        riskLevel = "High Risk";
        riskDescription = "Hate speech detected";
      } else if (inputText.toLowerCase().includes("fake")) {
        aiDecision = "AI automated result – flagged for misinformation review.";
        riskLevel = "Medium Risk";
        riskDescription = "Possible misinformation detected";
      }

      setResults({ humanDecision, aiDecision, riskLevel, riskDescription });
      setIsRunning(false);
    }, 1200);
  };

  const riskProps = results ? riskStyleMap[results.riskLevel] : riskStyleMap["Low Risk"];

  return (
    <div className="w-full max-w-3xl mx-auto py-6">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-1 text-ethic-green font-medium hover:underline transition-colors mb-2 text-sm">
          <ArrowLeft size={18} className="mr-1" />
          Back to Home
        </Link>
      </div>
      <div className="bg-[#F8FAFB] rounded-xl shadow-sm border border-[#E5E8ED] p-8 pb-7 animate-fade-in">
        <div className="flex items-center text-2xl font-extrabold text-ethic-green mb-1">
          {/* Shield icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-7 h-7 mr-2"
            aria-hidden="true"
            focusable="false"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2L3 5v6c0 5.25 3.813 9.75 9 11 5.188-1.25 9-5.75 9-11V5l-9-3z"
            />
          </svg>
          Shadow Mode
        </div>
        <div className="text-[17px] text-ethic-green font-bold mb-2 hidden">MODIFY SHADOW MODE</div>
        <div className="text-gray-500 mb-5 text-base">
          Run AI decisions in parallel to human ones—input your own scenario to compare outcomes!
        </div>

        {/* Input and button in inline arrangement */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-7 w-full">
          <input
            type="text"
            placeholder="Type your scenario here"
            className="flex-1 rounded-xl border-2 border-ethic-green outline-none focus:ring-2 focus:ring-ethic-green bg-white px-5 py-3 text-lg text-shadow-foreground transition shadow-sm font-normal"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isRunning}
            aria-label="Input scenario text"
            spellCheck={true}
            autoFocus
          />
          <Button
            className="bg-ethic-green hover:bg-ethic-green/90 text-white rounded-xl h-auto py-3 px-8 text-base font-semibold min-w-[138px] disabled:opacity-70 transition-all"
            onClick={handleRunTest}
            disabled={isRunning || !inputText.trim()}
            aria-busy={isRunning}
          >
            {isRunning ? "Running..." : "Run Test"}
          </Button>
        </div>

        {/* Results grid */}
        {results && (
          <>
            <div className="grid md:grid-cols-2 gap-4 mb-5">
              <div className="bg-white rounded-xl px-6 py-5 shadow-sm border border-[#E4E8ED]">
                <h3 className="font-bold text-[17px] text-shadow-foreground mb-1">Human Decision</h3>
                <p className="text-gray-800 text-base">{results.humanDecision}</p>
              </div>
              <div className="bg-white rounded-xl px-6 py-5 shadow-sm border border-[#E4E8ED]">
                <h3 className="font-bold text-[17px] text-shadow-foreground mb-1">AI Decision</h3>
                <p className="text-gray-800 text-base">{results.aiDecision}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pl-1">
              <span className={`px-4 py-1 rounded-full font-semibold text-sm ${riskProps.bg} ${riskProps.text} transition-colors`}>
                {riskProps.label}
              </span>
              <span className="text-gray-600 text-base">{results.riskDescription}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
