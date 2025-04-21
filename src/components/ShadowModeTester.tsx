
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
      // Simulate decisions based on simple keyword detection for demo
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
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto bg-shadow-card rounded-xl p-6 shadow-md animate-fade-in">
      <h2 className="text-xl font-bold text-ethic-green flex items-center mb-2">
        {/* Shield icon from lucide-react */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 mr-2"
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
      </h2>
      <p className="text-gray-600 mb-4">
        Run AI decisions in parallel to human ones&mdash;input your own scenario to compare outcomes!
      </p>

      <input
        type="text"
        placeholder="Type your scenario here"
        className="w-full rounded-md border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-ethic-green focus:border-transparent text-shadow-foreground"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isRunning}
        aria-label="Input scenario text"
      />

      <Button
        className="bg-ethic-green hover:bg-ethic-green/90 text-white mb-6 w-full"
        onClick={handleRunTest}
        disabled={isRunning || !inputText.trim()}
        aria-busy={isRunning}
      >
        {isRunning ? "Running..." : "Run Test"}
      </Button>

      {results && (
        <div className="space-y-4">
          <div className="bg-white rounded-md p-4 shadow border border-gray-200 text-left">
            <h3 className="font-semibold mb-1">Human Decision</h3>
            <p className="text-gray-700">{results.humanDecision}</p>
          </div>

          <div className="bg-white rounded-md p-4 shadow border border-gray-200 text-left">
            <h3 className="font-semibold mb-1">AI Decision</h3>
            <p className="text-gray-700">{results.aiDecision}</p>
          </div>

          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <span className="px-2 py-1 rounded-md text-green-800 bg-green-200 font-semibold">
              {results.riskLevel}
            </span>
            <span>{results.riskDescription}</span>
          </div>
        </div>
      )}
    </div>
  );
}
