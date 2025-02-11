import { TikTokPage } from "@remotion/captions";
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  FONT_WEIGHT,
  fontFamily,
  MAX_CAPTION_WIDTH,
  MAX_FONT_SIZE,
  TEXT_TRANSFORM,
} from "./config";
import { fitText } from "@remotion/layout-utils";

export const Page: React.FC<{
  page: TikTokPage;
  startMs: number;
}> = ({ page, startMs }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const fittedText = fitText({
    fontFamily,
    text: page.text,
    withinWidth: MAX_CAPTION_WIDTH,
    fontWeight: FONT_WEIGHT,
    textTransform: TEXT_TRANSFORM,
  });

  const fontSize = Math.min(MAX_FONT_SIZE, fittedText.fontSize);
  const textStrokeWidth = fontSize / 7;

  return (
    <div
      style={{
        fontSize,
        fontFamily,
        fontWeight: FONT_WEIGHT,
        color: "white",
        WebkitTextStroke: "black",
        WebkitTextStrokeWidth: textStrokeWidth,
        paintOrder: "stroke fill",
      }}
    >
      {page.tokens.map((token) => {
        const from = ((token.fromMs - startMs) / 1000) * fps;
        const end = ((token.toMs - startMs) / 1000) * fps;

        const active = frame >= from && frame < end;

        return (
          <span
            style={{
              color: active ? "#18ff0e" : "white",
              whiteSpace: "pre",
            }}
          >
            {token.text}
          </span>
        );
      })}
    </div>
  );
};
