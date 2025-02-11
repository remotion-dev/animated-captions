import React from "react";
import { sampleCaptions } from "./AnimatedCaptions/sample-data";
import { AnimatedCaptions } from "./AnimatedCaptions";
import { ColoredWords } from "./AnimatedCaptions/ColoredWords";

export const ColoredWordsDemo: React.FC = () => {
  return (
    <AnimatedCaptions PageComponent={ColoredWords} captions={sampleCaptions} />
  );
};
