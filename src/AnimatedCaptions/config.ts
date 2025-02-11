export const COMBINE_TOKENS_WITHIN_MILLISECONDS = 800;
export const MAX_CAPTION_WIDTH = 800;
export const MAX_FONT_SIZE = 80;
export const FONT_WEIGHT = "bold";
export const TEXT_TRANSFORM = "none" as const; // Set to "uppercase" to make all text uppercase

// Change the font that you want to use
// You can also display a font picker to your users:
// https://www.remotion.dev/docs/font-picker
import { loadFont, fontFamily } from "@remotion/google-fonts/Montserrat";

// Missing fonts can influence the layout calculation
// and cause the subtitles to be misaligned.
export const fontLoading = loadFont();
export { fontFamily };
