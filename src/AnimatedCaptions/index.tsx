import {
  Caption,
  createTikTokStyleCaptions,
  TikTokPage,
} from "@remotion/captions";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { WaitForFonts } from "./WaitForFonts";
import React, { useMemo } from "react";
import { ColoredWords } from "./styles/ColoredWords";
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
    <AbsoluteFill style={style}>
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
    </AbsoluteFill>
  );
};

export const AnimatedCaptions: React.FC<{
  captions: Caption[];
  PageComponent: PageComponent;
}> = ({ captions, PageComponent }) => {
  const { pages } = useMemo(() => {
    return createTikTokStyleCaptions({
      captions,
      combineTokensWithinMilliseconds: COMBINE_TOKENS_WITHIN_MILLISECONDS,
    });
  }, [captions]);

  return (
    <WaitForFonts>
      <Inner PageComponent={PageComponent} pages={pages} />
    </WaitForFonts>
  );
};
