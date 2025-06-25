import { TikTokPage } from "@remotion/captions";
import React, { useMemo } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  FONT_WEIGHT,
  fontFamily,
  MAX_CAPTION_WIDTH,
  MAX_FONT_SIZE,
  TEXT_TRANSFORM,
} from "../config";
import { fitText, measureText } from "@remotion/layout-utils";

const ANIMATION_LENGTH = 5;
const HORIZONTAL_PADDING = 12;
const VERTICAL_PADDING = 12;

const tokenStyle: React.CSSProperties = {
  whiteSpace: "pre",
  position: "relative",
};

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

  const backgroundWidths = useMemo(() => {
    return page.tokens.map((token) => {
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

      return {
        withWhitespace,
        withoutWhitespace,
        from: token.fromMs - page.startMs,
      };
    });
  }, [page, fontSize]);

  const wordIndex = backgroundWidths.reduce((sum, token, i) => {
    const nextWord = backgroundWidths[i + 1];
    if (!nextWord) {
      return sum;
    }

    const animate = spring({
      durationInFrames: ANIMATION_LENGTH,
      config: {
        damping: 100,
      },
      fps,
      frame,
      delay: (nextWord.from / 1000) * fps - ANIMATION_LENGTH / 2,
    });

    return sum + animate;
  }, 0);

  const offsetLeft = backgroundWidths.reduce((sum, token, i) => {
    const nextToken = backgroundWidths[i + 1] ?? null;
    const nextTokenWhitespace =
      nextToken === null
        ? 0
        : nextToken.withWhitespace.width - nextToken.withoutWhitespace.width;

    const widthToAdd = token.withoutWhitespace.width + nextTokenWhitespace;

    if (i > wordIndex) {
      return sum;
    }
    if (i <= wordIndex - 1) {
      return sum + widthToAdd;
    }
    return sum + (wordIndex % 1) * widthToAdd;
  }, 0);

  const width =
    backgroundWidths.length === 1
      ? backgroundWidths[0].withoutWhitespace.width
      : interpolate(
          wordIndex,
          new Array(backgroundWidths.length).fill(1).map((_, i) => i),
          backgroundWidths.map((w) => w.withoutWhitespace.width),
        );

  const totalWidth = backgroundWidths.reduce((sum, token) => {
    return sum + token.withWhitespace.width;
  }, 0);

  const appear = interpolate(
    spring({
      fps,
      frame,
      config: {
        damping: 200,
      },
      durationInFrames: ANIMATION_LENGTH,
    }),
    [0, 1],
    [0.6, 1],
  );

  const outerStyle: React.CSSProperties = useMemo(() => {
    return {
      fontSize,
      fontFamily,
      fontWeight: FONT_WEIGHT,
      color: "white",
      WebkitTextStroke: "black",
      WebkitTextStrokeWidth: textStrokeWidth,
      paintOrder: "stroke fill",
      position: "relative",
      width: totalWidth,
    };
  }, [totalWidth, textStrokeWidth, fontSize]);

  const backgroundStyle: React.CSSProperties = useMemo(() => {
    return {
      height:
        backgroundWidths[0].withoutWhitespace.height + VERTICAL_PADDING * 2,
      backgroundColor: "#0B84F3",
      width: width + HORIZONTAL_PADDING * 2,
      display: "block",
      position: "absolute",
      left: offsetLeft,
      marginLeft: -HORIZONTAL_PADDING,
      paddingLeft: HORIZONTAL_PADDING,
      paddingRight: HORIZONTAL_PADDING,
      borderRadius: 10,
      marginTop: -VERTICAL_PADDING,
      scale: appear,
    };
  }, [appear, offsetLeft, width]);

  return (
    <div style={outerStyle}>
      <div style={backgroundStyle}></div>
      {page.tokens.map((token) => {
        return (
          <span key={token.fromMs} style={tokenStyle}>
            {token.text}
          </span>
        );
      })}
    </div>
  );
};
