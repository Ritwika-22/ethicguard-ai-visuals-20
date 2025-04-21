
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";
import { useState } from "react";

interface ScoreInfoPopoverProps {
  score: number;
  max?: number;
}

export default function ScoreInfoPopover({ score, max = 100 }: ScoreInfoPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          aria-label="Show information about the AI Model Ethics Score"
          className="bg-ethic-green text-ethic-navy font-bold text-md px-3 py-1 rounded-lg flex items-center gap-2 transition-shadow hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ethic-green/40"
          type="button"
        >
          {score}/{max}
          <Info className="w-4 h-4 opacity-60" />
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" align="end" className="max-w-xs p-4">
        <div className="font-bold text-lg mb-2 text-ethic-navy">AI Model Ethics Score</div>
        <div className="text-gray-700 text-sm mb-2">
          This score estimates your AI model&apos;s overall alignment with ethical guidelines, fairness, and privacy compliance.
          <br /><br />
          <span className="font-medium text-ethic-green">Higher scores mean your model shows fewer risks of bias or privacy violations.</span>
        </div>
        <div className="text-xs text-gray-400">Want to improve this score? Run deeper audits in&nbsp;
          <a href="/dashboard/shadow" className="underline text-ethic-green hover:text-ethic-navy">Shadow Mode</a>
        </div>
      </PopoverContent>
    </Popover>
  );
}
