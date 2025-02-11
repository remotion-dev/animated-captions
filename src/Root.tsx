import { Composition } from "remotion";
import { AnimatedBackgroundDemo, ColoredWordsDemo } from "./Composition";
import { AnimatedBackground } from "./AnimatedCaptions/styles/AnimatedBackground";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        width={1000}
        height={1000}
        id="ColoredWords"
        durationInFrames={120}
        defaultProps={{}}
        component={ColoredWordsDemo}
        fps={30}
      />
      <Composition
        width={1000}
        height={1000}
        id="AnimatedBackground"
        durationInFrames={120}
        defaultProps={{}}
        component={AnimatedBackgroundDemo}
        fps={30}
      />
    </>
  );
};
