import { Composition } from "remotion";
import { ColoredWordsDemo } from "./Composition";

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
    </>
  );
};
