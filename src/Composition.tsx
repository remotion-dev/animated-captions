import React, { useMemo } from "react";
import { sampleCaptions } from "./AnimatedCaptions/sample-data";
import { ColoredWords } from "./AnimatedCaptions/styles/ColoredWords";
import { AnimatedBackground } from "./AnimatedCaptions/styles/AnimatedBackground";
import { ScalingWords } from "./AnimatedCaptions/styles/ScalingWords";
import { Caption, createTikTokStyleCaptions } from "@remotion/captions";
import { AbsoluteFill } from "remotion";
import { PageComponent, AnimatedCaptions } from "./AnimatedCaptions";
import { COMBINE_TOKENS_WITHIN_MILLISECONDS } from "./AnimatedCaptions/config";

export const ColoredWordsDemo: React.FC = () => {
  return (
    <Demos
      name="Colored Words Style"
      PageComponent={ColoredWords}
      captions={sampleCaptions}
    />
  );
};

export const ScalingWordsDemo: React.FC = () => {
  return (
    <Demos
      name="Scaling Words Style"
      PageComponent={ScalingWords}
      captions={sampleCaptions}
    />
  );
};

export const AnimatedBackgroundDemo: React.FC = () => {
  return (
    <Demos
      name="Animated Background Style"
      PageComponent={AnimatedBackground}
      captions={sampleCaptions}
    />
  );
};

const style: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const Demos: React.FC<{
  captions: Caption[];
  PageComponent: PageComponent;
  name: string;
}> = ({ captions, PageComponent, name }) => {
  const { pages } = useMemo(() => {
    return createTikTokStyleCaptions({
      captions,
      combineTokensWithinMilliseconds: COMBINE_TOKENS_WITHIN_MILLISECONDS,
    });
  }, [captions]);

  return (
    <AbsoluteFill
      style={{
        ...style,
        backgroundColor: "#eee",
      }}
    >
      <AnimatedCaptions PageComponent={PageComponent} pages={pages} />
      <div
        style={{
          fontFamily: "sans-serif",
          fontSize: 40,
          marginTop: 350,
          marginBottom: -350,
        }}
      >
        {name}
      </div>
    </AbsoluteFill>
  );
};
