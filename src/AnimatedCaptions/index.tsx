import {
  Caption,
  createTikTokStyleCaptions,
  TikTokPage,
} from "@remotion/captions";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { WaitForFonts } from "./WaitForFonts";
import React, { useMemo } from "react";
import { COMBINE_TOKENS_WITHIN_MILLISECONDS } from "./config";

const style: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export type PageComponent = React.FC<{
  page: TikTokPage;
}>;

const Inner: React.FC<{
  pages: TikTokPage[];
  PageComponent: PageComponent;
}> = ({ pages, PageComponent }) => {
  const { fps } = useVideoConfig();

  return (
    <div>
      {pages.map((page, i) => {
        const start = (page.startMs / 1000) * fps;
        const nextPage = pages[i + 1] ?? null;
        const duration =
          nextPage === null
            ? Infinity
            : ((nextPage.startMs - page.startMs) / 1000) * fps;

        return (
          <Sequence
            layout="none"
            key={page.startMs}
            durationInFrames={duration}
            from={start}
          >
            <PageComponent page={page} />
          </Sequence>
        );
      })}
    </div>
  );
};

export const AnimatedCaptions: React.FC<{
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
      <WaitForFonts>
        <Inner PageComponent={PageComponent} pages={pages} />
      </WaitForFonts>
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
