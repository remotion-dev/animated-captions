# Animated caption styles

These animated caption styles are ideal if you want to caption your short-form videos.

The styles can easily be copied into your Remotion project and work with any captions that have been converted into the [`@remotion/captions`](https://www.remotion.dev/docs/captions/caption) format.

There are no other dependencies and the styles can be used individually and be easily customized.

3 styles are included:

- Colored words: Paginated captions with color highlights for the active word.  
- Scaling words: Same as colored words, but each active word scales up to add more pop.
- Animated background: A rounded rectangle animates behind the words and jumps from word to word using a spring animation.

All styles will automatically shrink the text if it does not fit inside the desired width.  

Any Google Font can be used, but not all display stroked text properly.

## Example usage

Copy the `src/AnimatedCaptions` folder into your project.

```tsx 
import { AnimatedCaptions } from "./AnimatedCaptions";
import { AnimatedBackground } from "./AnimatedCaptions/styles/AnimatedBackground";
import { createTikTokStyleCaptions } from "@remotion/captions";

// ...

const {pages} = createTikTokStyleCaptions({ /* ... */})

return <AnimatedCaptions PageComponent={AnimatedBackground} pages={pages} />
```

See the documentation for [`createTikTokStyleCaptions()`](https://www.remotion.dev/docs/captions/create-tiktok-style-captions) for an example of how to generate captions.

## Playground

Run

```sh
npx remotion studio
```

to see the example playground.

## License

Notice that for some entities a company license is needed. Read [the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).

You may only use these components if you bought them on [remotion.pro](https://www.remotion.pro).

It is forbidden to redistribute the source code of this project.
