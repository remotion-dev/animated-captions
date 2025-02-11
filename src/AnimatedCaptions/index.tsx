import { TikTokPage } from "@remotion/captions";
import { Sequence, useVideoConfig } from "remotion";
import React from "react";
import { WaitForFonts } from "./WaitForFonts";

export type PageComponent = React.FC<{
  page: TikTokPage;
}>;

export const AnimatedCaptions: React.FC<{
  pages: TikTokPage[];
  PageComponent: PageComponent;
}> = ({ pages, PageComponent }) => {
  const { fps } = useVideoConfig();

  return (
    <WaitForFonts>
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
    </WaitForFonts>
  );
};
