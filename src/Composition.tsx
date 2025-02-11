import React from "react";
import { sampleCaptions } from "./AnimatedCaptions/sample-data";
import { AnimatedCaptions } from "./AnimatedCaptions";
import { ColoredWords } from "./AnimatedCaptions/styles/ColoredWords";
import { AnimatedBackground } from "./AnimatedCaptions/styles/AnimatedBackground";
import { ScalingWords } from "./AnimatedCaptions/styles/ScalingWords";

export const ColoredWordsDemo: React.FC = () => {
  return (
    <AnimatedCaptions
      name="Colored Words Style"
      PageComponent={ColoredWords}
      captions={sampleCaptions}
    />
  );
};

export const ScalingWordsDemo: React.FC = () => {
  return (
    <AnimatedCaptions
      name="Scaling Words Style"
      PageComponent={ScalingWords}
      captions={sampleCaptions}
    />
  );
};

export const AnimatedBackgroundDemo: React.FC = () => {
  return (
    <AnimatedCaptions
      name="Animated Background Style"
      PageComponent={AnimatedBackground}
      captions={sampleCaptions}
    />
  );
};
