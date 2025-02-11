import { TikTokPage } from "@remotion/captions";
import React, { useMemo } from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  FONT_WEIGHT,
  fontFamily,
  MAX_CAPTION_WIDTH,
  MAX_FONT_SIZE,
  TEXT_TRANSFORM,
} from "../config";
import { fitText } from "@remotion/layout-utils";

const CONTAINER_HEIGHT = MAX_FONT_SIZE * 1.5;

export const ScalingWords: React.FC<{
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

  const style: React.CSSProperties = useMemo(() => {
    return {
      fontSize,
      fontFamily,
      fontWeight: FONT_WEIGHT,
      color: "white",
      WebkitTextStroke: "black",
      WebkitTextStrokeWidth: textStrokeWidth,
      paintOrder: "stroke fill",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      height: CONTAINER_HEIGHT,
    };
  }, [textStrokeWidth, fontSize]);

  return (
    <div style={style}>
      {page.tokens.map((token) => {
        const from = ((token.fromMs - page.startMs) / 1000) * fps;
        const end = ((token.toMs - page.startMs) / 1000) * fps;

        const active = frame >= from && frame < end;
        const animation = active
          ? spring({
              fps,
              frame,
              delay: from,
              durationInFrames: Math.min(4, end - from),
            })
          : 0;
        const scale = animation * 0.2 + 1;

        return (
          <span
            key={token.fromMs}
            style={{
              color: active ? "#18ff0e" : "white",
              whiteSpace: "pre",
              fontSize: scale * fontSize,
              display: "inline-block",
              verticalAlign: "middle",
              // Make this animation smooth: http://remotion.dev/docs/troubleshooting/subpixel-rendering
              transform: "perspective(100px)",
              willChange: "transform",
            }}
          >
            {token.text}
          </span>
        );
      })}
    </div>
  );
};
