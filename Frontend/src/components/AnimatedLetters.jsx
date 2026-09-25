import React from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedLetters Component
 * Split text by letters or words and animates them with staggered spring motion.
 */
export default function AnimatedLetters({
  text = '',
  className = '',
  delay = 0.05,
  stagger = 0.02,
  mode = 'letters', // 'letters' | 'words'
  once = true,
  as: Component = 'span'
}) {
  if (!text) return null;

  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: mode === 'words' ? 0.07 : stagger,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 18,
      scale: 0.9,
      filter: 'blur(3px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 220,
      },
    },
  };

  if (mode === 'words') {
    return (
      <motion.span
        className="inline"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.2 }}
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.28em]">
            <motion.span
              variants={letterVariants}
              className={`inline-block ${className}`}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    );
  }

  return (
    <motion.span
      className="inline"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.28em]">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={letterVariants}
              className={`inline-block ${className}`}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}

/**
 * AnimatedHeading Component
 * Convenient wrapper for headings with multi-part text (normal + gradient text)
 */
export function AnimatedHeading({
  plainText = '',
  highlightText = '',
  highlightPosition = 'after', // 'before' | 'after'
  className = '',
  plainClassName = 'text-slate-900',
  highlightClassName = 'bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 bg-clip-text text-transparent',
  as: Tag = 'h2',
  delay = 0.05,
  stagger = 0.02,
  mode = 'letters'
}) {
  return (
    <Tag className={className}>
      {highlightPosition === 'before' && highlightText && (
        <>
          <AnimatedLetters
            text={highlightText}
            className={highlightClassName}
            delay={delay}
            stagger={stagger}
            mode={mode}
          />{' '}
        </>
      )}

      {plainText && (
        <AnimatedLetters
          text={plainText}
          className={plainClassName}
          delay={highlightPosition === 'before' ? delay + 0.2 : delay}
          stagger={stagger}
          mode={mode}
        />
      )}

      {highlightPosition === 'after' && highlightText && (
        <>
          {' '}
          <AnimatedLetters
            text={highlightText}
            className={highlightClassName}
            delay={delay + 0.2}
            stagger={stagger}
            mode={mode}
          />
        </>
      )}
    </Tag>
  );
}
