"use client";

import { useEffect } from "react";

export function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((node) => {
        node.classList.add("is-revealed");
      });
      return;
    }

    document.documentElement.classList.add("reveal-armed");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -2% 0px" },
    );

    const observeAll = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)").forEach((node) => {
        // If element is already in the viewport upon insertion, reveal it immediately
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          node.classList.add("is-revealed");
        } else {
          observer.observe(node);
        }
      });
    };

    observeAll();

    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.documentElement.classList.remove("reveal-armed");
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
