"use client";

import { useEffect, useRef, useState, useMemo, useCallback, type ReactNode } from "react";
import { gsap } from "gsap";

/**
 * TextType (react-bits), typed and with two additions this site needs.
 *
 * 1. `onCharacter` fires for each character as it lands, which is what drives
 *    the keystroke sound. Doing it here rather than diffing the string in the
 *    parent means the sound is bound to the event that caused it — no missed
 *    strokes when two characters land in the same frame.
 *
 * 2. `renderText` lets the caller decorate what has been typed so far. The
 *    original renders one plain string, which cannot carry the ornamental
 *    Amoresa "A" the design puts mid-sentence in "Aastha". The default is the
 *    original behaviour, so this costs nothing when unused.
 *
 * Everything else is the library component: the same state machine, the same
 * GSAP cursor blink, the same loop/delete behaviour.
 */

type VariableSpeed = { min: number; max: number };

type Props = {
  text: string | string[];
  as?: keyof HTMLElementTagNameMap;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string;
  cursorClassName?: string;
  cursorBlinkDuration?: number;
  variableSpeed?: VariableSpeed;
  startOnVisible?: boolean;
  /** Fires per character typed. `char` is the character that just landed. */
  onCharacter?: (char: string, index: number) => void;
  /** Fires once the last string has finished typing (only meaningful when loop is false). */
  onComplete?: () => void;
  /** Decorate the typed-so-far string. Defaults to rendering it as plain text. */
  renderText?: (shown: string) => ReactNode;
};

export default function TextType({
  text,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  variableSpeed,
  startOnVisible = false,
  onCharacter,
  onComplete,
  renderText,
  ...props
}: Props) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const completed = useRef(false);

  // Callbacks in a ref: they are almost always inline arrow functions, and
  // putting them in the effect's deps would restart the timer on every render.
  const cbRef = useRef({ onCharacter, onComplete });
  cbRef.current = { onCharacter, onComplete };

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    return Math.random() * (variableSpeed.max - variableSpeed.min) + variableSpeed.min;
  }, [variableSpeed, typingSpeed]);

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setIsVisible(true)),
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (!showCursor || !cursorRef.current) return;
    gsap.set(cursorRef.current, { opacity: 1 });
    const tween = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });
    return () => {
      tween.kill();
    };
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) return;
    let timeout: ReturnType<typeof setTimeout>;
    const current = textArray[currentTextIndex];

    const run = () => {
      if (isDeleting) {
        if (displayedText === "") {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) return;
          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
        } else {
          timeout = setTimeout(() => setDisplayedText((prev) => prev.slice(0, -1)), deletingSpeed);
        }
        return;
      }

      if (currentCharIndex < current.length) {
        timeout = setTimeout(
          () => {
            const char = current[currentCharIndex];
            setDisplayedText((prev) => prev + char);
            setCurrentCharIndex((prev) => prev + 1);
            cbRef.current.onCharacter?.(char, currentCharIndex);
          },
          variableSpeed ? getRandomSpeed() : typingSpeed
        );
        return;
      }

      if (!loop && currentTextIndex === textArray.length - 1) {
        if (!completed.current) {
          completed.current = true;
          cbRef.current.onComplete?.();
        }
        return;
      }
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
      timeout = setTimeout(run, initialDelay);
    } else {
      run();
    }
    return () => clearTimeout(timeout);
  }, [
    currentCharIndex, displayedText, isDeleting, typingSpeed, deletingSpeed,
    pauseDuration, textArray, currentTextIndex, loop, initialDelay, isVisible,
    variableSpeed, getRandomSpeed,
  ]);

  const shouldHideCursor =
    hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

  const Tag = Component as "div";
  return (
    <Tag ref={containerRef as React.Ref<HTMLDivElement>} className={`text-type ${className}`} {...props}>
      <span className="text-type__content">
        {renderText ? renderText(displayedText) : displayedText}
      </span>
      {showCursor && (
        <span
          ref={cursorRef}
          className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? "text-type__cursor--hidden" : ""}`}
        >
          {cursorCharacter}
        </span>
      )}
    </Tag>
  );
}
