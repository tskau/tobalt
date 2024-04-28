# tobalt
the simple cobalt API client written in typescript

### installation

```bash
npm install --save @tskau/tobalt
# yarn install @tskau/tobalt
# pnpm add @tskau/tobalt
```

### usage example

```js
// you can use require() to use tobalt
// const { Client } = require('@tskau/tobalt')
import { Client } from '@tskau/tobalt'

// you can use your own custom instance
// const COBALT_BASE_URL = 'https://co.tskau.team/api/'
const COBALT_BASE_URL = 'https://co.wuk.sh/api/'

// the initialization of the client
const cobalt = new Client({ baseUrl: COBALT_BASE_URL })

// the method to fetch the server information
const serverInfo = await cobalt.serverInfo()

// serverInfo() simply returns the response from cobalt
serverInfo.version // '7.13'
serverInfo.name // 'nl4'
serverInfo.url // 'https://nl4-co.wuk.sh/'

// fetching the "The Atomic Way" trailer in the VP9 codec
const singleContent = await cobalt.fetchContent({
  url: 'https://www.youtube.com/watch?v=a-bu_ZUEwuk',
  vCodec: 'vp9'
})

await singleContent.content.stream() // readable stream
await singleContent.content.save('/tmp/the-atomic-way.webm') // save to file
singleContent.content.url // 'https://nl4-co.wuk.sh/api/stream?t=...'

// fetching several videos from the tweet
const picker = await cobalt.fetchContent({
  url: 'https://twitter.com/akepon0129/status/1782050982723273127'
})

picker.type // 'various' or 'images'

// the same thing like with single content
await picker.items[0].stream()
await picker.items[0].save('/tmp/silly-billy.mp4')
picker.items[0].url // 'https://video.twimg.com/ext_tw_video/...'

// the same thing as with picker but it has audio field
const pickerWithAudio = await cobalt.fetchContent({
  url: 'https://www.tiktok.com/@matryoshk4/video/7231234675476532526'
})

await picker.audio.stream()
await picker.audio.save('/tmp/tiktok-audio.mp3')
picker.audio.url // "https://sf16-ies-music-va.tiktokcdn.com/obj/...'
```

### other implementations/projects

- [lostdusty/gobalt](https://github.com/lostdusty/gobalt) (client in golang)
- [lostdusty/cobalt](https://github.com/lostdusty/cobalt) (cli client in golang)
- [khyerdev/tcobalt](https://github.com/khyerdev/tcobalt) (cli client in rust)
