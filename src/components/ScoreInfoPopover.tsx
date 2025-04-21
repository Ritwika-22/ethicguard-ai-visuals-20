
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ScoreInfoPopoverProps {
  score: number;
  max?: number;
}

export default function ScoreInfoPopover({ score, max = 100 }: ScoreInfoPopoverProps) {
  // Using Dialog instead of Popover for better mobile compatibility
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          aria-label="Show information about the AI Model Ethics Score"
          className="bg-ethic-green text-ethic-navy font-bold text-md px-3 py-1 rounded-lg flex items-center gap-2 transition-all hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ethic-green/40 active:scale-95"
          type="button"
        >
          {score}/{max}
          <Info className="w-4 h-4 opacity-60" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-ethic-navy">AI Model Ethics Score</DialogTitle>
          <DialogDescription className="text-gray-700">
            <p className="mt-2">
              This score estimates your AI model's overall alignment with ethical guidelines, fairness, and privacy compliance.
            </p>
            <p className="mt-4 font-medium text-ethic-green">
              Higher scores mean your model shows fewer risks of bias or privacy violations.
            </p>
            <div className="mt-4 text-xs text-gray-400">
              Want to improve this score? Run deeper audits in{" "}
              <a href="/dashboard/shadow" className="underline text-ethic-green hover:text-ethic-navy">
                Shadow Mode
              </a>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
