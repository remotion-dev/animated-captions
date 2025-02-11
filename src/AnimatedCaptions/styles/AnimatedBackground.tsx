import { TikTokPage } from "@remotion/captions";
import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  FONT_WEIGHT,
  fontFamily,
  MAX_CAPTION_WIDTH,
  MAX_FONT_SIZE,
  TEXT_TRANSFORM,
} from "../config";
import { fitText, measureText } from "@remotion/layout-utils";

export const AnimatedBackground: React.FC<{
  page: TikTokPage;
}> = ({ page }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const fittedText = useMemo(() => {
    return fitText({
      fontFamily,
      text: page.text,
      withinWidth: MAX_CAPTION_WIDTH,
      fontWeight: FONT_WEIGHT,
      textTransform: TEXT_TRANSFORM,
    });
  }, [page]);

  const fontSize = Math.min(MAX_FONT_SIZE, fittedText.fontSize);
  const textStrokeWidth = fontSize / 7;

  const backgroundWidths = page.tokens.map((token) => {
    const withWhitespace = measureText({
      fontFamily,
      fontSize,
      text: token.text,
      fontWeight: FONT_WEIGHT,
      validateFontIsLoaded: true,
      textTransform: TEXT_TRANSFORM,
    });
    const withoutWhitespace = measureText({
      fontFamily,
      fontSize,
      text: token.text.trim(),
      fontWeight: FONT_WEIGHT,
      validateFontIsLoaded: true,
      textTransform: TEXT_TRANSFORM,
    });

    return { withWhitespace, withoutWhitespace };
  });

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
        position: "relative",
      }}
    >
      <div
        style={{
          height: 90,
          backgroundColor: "red",
          width: backgroundWidths[0].withoutWhitespace.width,
          display: "block",
          position: "absolute",
        }}
      ></div>
      {page.tokens.map((token) => {
        const from = ((token.fromMs - page.startMs) / 1000) * fps;
        const end = ((token.toMs - page.startMs) / 1000) * fps;

        const active = frame >= from && frame < end;

        return (
          <span
            style={{
              background: active ? "blue" : "transparent",
              whiteSpace: "pre",
              borderRadius: 10,
            }}
          >
            {token.text}
          </span>
        );
      })}
    </div>
  );
};
