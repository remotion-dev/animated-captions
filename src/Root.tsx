import { Composition } from "remotion";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        width={1000}
        height={1000}
        id="MyComp"
        durationInFrames={120}
        defaultProps={{}}
        component={MyComposition}
        fps={30}
      />
    </>
  );
};
