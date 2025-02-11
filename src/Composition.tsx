import React from "react";
import { sampleCaptions } from "./AnimatedCaptions/sample-data";
import { AnimatedCaptions } from "./AnimatedCaptions";
import { ColoredWords } from "./AnimatedCaptions/styles/ColoredWords";
import { AnimatedBackground } from "./AnimatedCaptions/styles/AnimatedBackground";

export const ColoredWordsDemo: React.FC = () => {
  return (
    <AnimatedCaptions PageComponent={ColoredWords} captions={sampleCaptions} />
  );
};

export const AnimatedBackgroundDemo: React.FC = () => {
  return (
    <AnimatedCaptions
      PageComponent={AnimatedBackground}
      captions={sampleCaptions}
    />
  );
};
