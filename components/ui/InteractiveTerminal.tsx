"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, Play, Sparkle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { soundManager } from "./SoundEffects";

interface TabData {
  id: string;
  name: string;
  command: string;
  output: string;
}

const tabs: TabData[] = [
  {
    id: "profile",
    name: "kunal.config.ts",
    command: "npx studio-profile --name='Kunal Kumar' --status='Available for Q2/Q3'",
    output: `export const designer = {
  name: "Kunal Kumar",
  role: "Lead UI/UX Designer & 3D Artist",
  location: "India · Worldwide Remote",
  experience: "5+ Years Crafting High-Converting Experiences",
  philosophy: "Good design, brighter days — loud shapes, useful systems.",
  availableFor: ["Full Product Redesigns", "3D Brand Launch", "Design Systems"],
  contact: "kkunalkumar0055@gmail.com",
};`,
  },
  {
    id: "skills",
    name: "capabilities.sh",
    command: "curl -s https://kunalkumar.design/api/v1/capabilities | jq .",
    output: `{
  "core_competencies": [
    "Product Architecture & High-Conversion UX Flows",
    "Figma Design Systems (Auto-Layout, Tokens, Variables)",
    "Procedural 3D Art & Shaders (Blender, Cinema 4D)",
    "Spatial Visuals, Motion Graphics & Interactive Prototypes",
    "Brand Identity Systems: Typography, Vector Art, Color Architecture"
  ],
  "turnaround": "Rapid 2-4 Week Production Sprints",
  "client_satisfaction": "100% On-Time Delivery Track Record"
}`,
  },
  {
    id: "stack",
    name: "toolstack.log",
    command: "docker run --rm kunal/creative-suite --benchmark",
    output: `[INIT] Loading creative environment...
✔ Figma Design Tokens Engine: ACTIVE
✔ Blender 4.2 Cycles Raytracer: 60 FPS Optimized
✔ Spline 3D & Cinema 4D Studio: CONNECTED
✔ Adobe Creative Cloud & Vector Suite: READY
✔ Protopie Micro-Interactions Engine: LOADED
[STATUS] 0 Errors · Ready to build memorable visual products.`,
  },
  {
    id: "estimate",
    name: "instant-quote.env",
    command: "eval $(kunal-estimate --project=full-redesign --timeline=3w)",
    output: `# SPRINT ESTIMATOR CONFIG
ESTIMATED_DURATION="3-4 Weeks"
DELIVERABLES="Figma Master System + 3D Visuals + Style Guide"
REVISIONS="Unlimited during active sprint"
COMMUNICATION="Direct Slack / Async Loom / Weekly Sync"
STATUS="READY TO START"`,
  },
];

export function InteractiveTerminal({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [copied, setCopied] = useState<boolean>(false);
  const [commandInput, setCommandInput] = useState<string>("");
  const [customOutputs, setCustomOutputs] = useState<string[]>([]);

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  const handleCopy = () => {
    soundManager.playChime();
    navigator.clipboard.writeText(currentTab.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    soundManager.playPowerUp();
    const cmd = commandInput.trim().toLowerCase();
    let res = "";

    if (cmd.includes("help")) {
      res = `Available commands: 'whoami', 'skills', 'hire', 'projects', 'clear', 'vibe'`;
    } else if (cmd.includes("whoami")) {
      res = `Kunal Kumar — Independent UI/UX Designer & 3D Artist building iconic digital products.`;
    } else if (cmd.includes("hire") || cmd.includes("contact")) {
      res = `Reach out directly at: kkunalkumar0055@gmail.com. Let's make something incredible!`;
    } else if (cmd.includes("clear")) {
      setCustomOutputs([]);
      setCommandInput("");
      return;
    } else if (cmd.includes("vibe")) {
      res = `✨ 100% pure creative energy · Ready to take your brand to the next dimension!`;
    } else {
      res = `Executed: '${cmd}' → Result: OK · Want to start a project? Email kkunalkumar0055@gmail.com`;
    }

    setCustomOutputs((prev) => [...prev, `> ${commandInput}`, res]);
    setCommandInput("");
  };

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-3xl border-2 border-black/90 bg-[#121113] text-zinc-100 shadow-[8px_8px_0px_#171515] font-mono",
        className
      )}
    >
      {/* Terminal Titlebar with Mac/Arcade traffic lights */}
      <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 bg-[#1a181c] px-4 py-3 gap-2">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#ff5f56] border border-black/30 shadow-sm" />
          <span className="size-3 rounded-full bg-[#ffbd2e] border border-black/30 shadow-sm" />
          <span className="size-3 rounded-full bg-[#27c93f] border border-black/30 shadow-sm" />
          <span className="ml-2 flex items-center gap-1 text-xs font-bold text-zinc-400">
            <Terminal size={14} weight="bold" className="text-amber-400" />
            kunal-os@studio-terminal:~
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                soundManager.playClick();
                setActiveTab(tab.id);
              }}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-all",
                activeTab === tab.id
                  ? "bg-zinc-800 text-amber-300 font-bold border border-zinc-700 shadow-inner"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              )}
            >
              {tab.name}
            </button>
          ))}
          <button
            type="button"
            onClick={handleCopy}
            title="Copy code"
            className="ml-2 flex items-center gap-1 rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
          >
            {copied ? (
              <>
                <Check size={12} weight="bold" className="text-emerald-400" />
                <span className="text-[11px] text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={12} weight="bold" />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Editor & Terminal Body */}
      <div className="flex-1 p-5 text-sm leading-relaxed overflow-x-auto">
        {/* Active Tab Command */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3 border-b border-zinc-800/80 pb-2">
          <span className="text-emerald-400 font-bold">$</span>
          <span className="text-amber-300">{currentTab.command}</span>
        </div>

        {/* Formatted Output */}
        <pre className="font-mono text-xs sm:text-sm text-zinc-300 whitespace-pre-wrap selection:bg-amber-500 selection:text-black">
          {currentTab.output}
        </pre>

        {/* Custom Outputs */}
        {customOutputs.length > 0 && (
          <div className="mt-4 pt-3 border-t border-dashed border-zinc-800">
            {customOutputs.map((line, idx) => (
              <div
                key={idx}
                className={cn(
                  "text-xs py-0.5",
                  line.startsWith(">") ? "text-amber-400 font-bold" : "text-emerald-300"
                )}
              >
                {line}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Command Input Line */}
      <form
        onSubmit={handleRunCommand}
        className="flex items-center border-t border-zinc-800 bg-[#171618] px-4 py-2.5 gap-2"
      >
        <span className="text-emerald-400 text-xs font-bold">kunal@studio:~$</span>
        <input
          type="text"
          value={commandInput}
          onChange={(e) => setCommandInput(e.target.value)}
          placeholder="Try typing 'whoami', 'skills', 'hire', or 'help'..."
          className="flex-1 bg-transparent text-xs text-white placeholder-zinc-500 outline-none font-mono"
        />
        <button
          type="submit"
          className="flex items-center gap-1 rounded bg-amber-400 px-2.5 py-1 text-[11px] font-bold text-black hover:bg-amber-300 transition-colors"
        >
          <Play size={10} weight="fill" /> Run
        </button>
      </form>
    </div>
  );
}
