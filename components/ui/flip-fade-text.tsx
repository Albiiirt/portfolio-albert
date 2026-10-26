"use client";

// Adapted from VengeanceUI's Flip Fade Text
// (https://www.vengenceui.com/components/flip-fade-text) — hand-copied
// rather than CLI-installed so the default Tailwind typography classes
// (text-4xl, uppercase, text-neutral-800...) could be dropped in favor of
// this site's own `hero-heading` CSS, passed in via `textClassName`.

import { useEffect, useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlipFadeTextProps {
  /** Phrases to cycle through */
  words: string[];
  /** Milliseconds each phrase stays visible before flipping to the next */
  interval?: number;
  /** Classes for the outer container */
  className?: string;
  /** Classes for the text itself — carries the site's own typography */
  textClassName?: string;
  /** Per-letter animation duration, in seconds */
  letterDuration?: number;
  /** Stagger delay between letters on enter, in seconds */
  staggerDelay?: number;
  /** Stagger delay between letters on exit, in seconds */
  exitStaggerDelay?: number;
}

const Letter = memo(function Letter({
  char,
  letterDuration,
}: {
  char: string;
  letterDuration: number;
}) {
  return (
    <motion.span
      style={{ transformStyle: "preserve-3d", display: "inline-block" }}
      variants={{
        initial: { rotateX: 90, y: 20, opacity: 0, filter: "blur(8px)" },
        animate: {
          rotateX: 0,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          transition: { duration: letterDuration, ease: [0.2, 0.65, 0.3, 0.9] },
        },
        exit: {
          rotateX: -90,
          y: -20,
          opacity: 0,
          filter: "blur(8px)",
          transition: { duration: letterDuration * 0.67, ease: "easeIn" },
        },
      }}
    >
      {char === " " ? " " : char}
    </motion.span>
  );
});

const Word = memo(function Word({
  text,
  staggerDelay,
  exitStaggerDelay,
  letterDuration,
  textClassName,
}: {
  text: string;
  staggerDelay: number;
  exitStaggerDelay: number;
  letterDuration: number;
  textClassName?: string;
}) {
  // "\n" forces a hard line break (e.g. a phrase too long for one line on
  // mobile); each resulting line is then split into space-separated words
  // so flex-wrap can only break *between* words within that line.
  const lines = useMemo(() => text.split("\n"), [text]);
  let flatIndex = 0;

  return (
    <motion.div
      className={cn("flex flex-col", textClassName)}
      style={{ rowGap: "0" }}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: { opacity: 1 },
        animate: { opacity: 1, transition: { staggerChildren: staggerDelay } },
        exit: { opacity: 1, transition: { staggerChildren: exitStaggerDelay } },
      }}
    >
      {lines.map((line, li) => (
        <div
          key={li}
          className="flex flex-nowrap justify-center"
          style={{ columnGap: "0.25em", rowGap: "0" }}
        >
          {line.split(" ").map((word, wi) => (
            <span key={`${word}-${li}-${wi}`} style={{ display: "inline-flex", whiteSpace: "nowrap" }}>
              {word.split("").map((char) => {
                const key = `${char}-${flatIndex}`;
                flatIndex += 1;
                return <Letter key={key} char={char} letterDuration={letterDuration} />;
              })}
            </span>
          ))}
        </div>
      ))}
    </motion.div>
  );
});

export function FlipFadeText({
  words,
  interval = 2800,
  className,
  textClassName,
  letterDuration = 0.6,
  staggerDelay = 0.1,
  exitStaggerDelay = 0.05,
}: FlipFadeTextProps) {
  const [index, setIndex] = useState(0);

  const updateIndex = useCallback(() => {
    setIndex((prev) => (prev + 1) % words.length);
  }, [words.length]);

  useEffect(() => {
    if (words.length < 2) return;
    const timer = setInterval(updateIndex, interval);
    return () => clearInterval(timer);
  }, [updateIndex, interval, words.length]);

  const currentWord = words[index];

  return (
    <div className={cn("flex", className)} style={{ perspective: "1000px" }}>
      <AnimatePresence mode="wait">
        <Word
          key={currentWord}
          text={currentWord}
          staggerDelay={staggerDelay}
          exitStaggerDelay={exitStaggerDelay}
          letterDuration={letterDuration}
          textClassName={textClassName}
        />
      </AnimatePresence>
    </div>
  );
}

export default FlipFadeText;
