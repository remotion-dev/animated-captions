import { Composition } from "remotion";
import {
  AnimatedBackgroundDemo,
  ColoredWordsDemo,
  ScalingWordsDemo,
} from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        width={1000}
        height={1000}
        id="ColoredWords"
        durationInFrames={150}
        defaultProps={{}}
        component={ColoredWordsDemo}
        fps={30}
      />
      <Composition
        width={1000}
        height={1000}
        id="AnimatedBackground"
        durationInFrames={150}
        defaultProps={{}}
        component={AnimatedBackgroundDemo}
        fps={30}
      />
      <Composition
        width={1000}
        height={1000}
        id="ScalingWords"
        durationInFrames={150}
        defaultProps={{}}
        component={ScalingWordsDemo}
        fps={30}
      />
    </>
  );
};
