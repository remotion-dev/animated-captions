import React from "react";
import { AbsoluteFill } from "remotion";
import { AnimatedCaptions } from "./AnimatedCaptions/AnimatedCaptions";
import { sampleCaptions } from "./AnimatedCaptions/sample-data";

export const MyComposition: React.FC = () => {
  return (
    <AbsoluteFill>
      <AnimatedCaptions captions={sampleCaptions} />
    </AbsoluteFill>
  );
};
