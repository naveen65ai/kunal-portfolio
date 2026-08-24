"use client";

import { useState } from "react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { soundManager } from "@/components/ui/SoundEffects";

type Faq = {
  question: string;
  answer: string;
};

const faqs: Faq[] = [
  {
    question: "What does a project with you look like?",
    answer:
      "A tight loop: we align on goals, I share flows and visual directions early, then we build in reviewable steps. You see progress weekly — never a big reveal that misses.",
  },
  {
    question: "How do you price your work?",
    answer:
      "Fixed price per scope, agreed before anything starts. No hourly surprises. Once we define the outcome, the number is locked and so is my accountability to it.",
  },
  {
    question: "How fast can you start?",
    answer:
      "Usually within one to two weeks. Small brand sprints and 3D pieces can often slot in sooner — tell me your date and I'll be honest about what fits.",
  },
  {
    question: "How are your design files and 3D assets delivered?",
    answer:
      "Structured and production-ready. Clean Figma systems, organized layers, high-res renders, vector assets, and video walkthroughs. You get complete precision, not messy artboards.",
  },
  {
    question: "Can you handle both design and 3D for one project?",
    answer:
      "That's the sweet spot. Interface, identity, motion, and 3D from one brain means the work stays coherent instead of stitched together by committee.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    soundManager.playClick();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-title">
      <div className="faq-inner">
        <p className="hand-label">Before you ask</p>
        <h2 id="faq-title">Fair questions, straight answers.</h2>

        <ul className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={faq.question} className={isOpen ? "is-open" : ""}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-button-${index}`}
                  onClick={() => handleToggle(index)}
                  onMouseEnter={() => soundManager.playHover()}
                >
                  <span>{faq.question}</span>
                  <Plus aria-hidden="true" weight="bold" className="faq-icon" />
                </button>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  hidden={!isOpen}
                >
                  <p>{faq.answer}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="faq-outro">
          Something else on your mind?{" "}
          <a
            href="#contact"
            onClick={() => soundManager.playClick()}
          >
            Ask me directly →
          </a>
        </p>
      </div>
    </section>
  );
}
