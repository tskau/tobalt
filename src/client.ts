import axios, { AxiosError, AxiosInstance } from 'axios'
import { TobaltError } from './error'
import * as globals from './globals'
import {
  DoubleContent,
  Picker,
  PickerType,
  PickerWithAudio,
  SingleContent
} from './results'
import { Content } from './content'

export interface CobaltOptions {
  baseUrl?: string
}

export interface FetchOptions {
  url: string
  vCodec?: 'h264' | 'av1' | 'vp9'
  vQuality?: string
  aFormat?: 'best' | 'mp3' | 'ogg' | 'wav' | 'opus'
  filenamePattern?: 'classic' | 'pretty' | 'basic' | 'nerdy'
  isAudioOnly?: boolean
  isTTFullAudio?: boolean
  isAudioMuted?: boolean
  dubLang?: string
  disableMetadata?: boolean
  twitterGif?: boolean
  vimeoDash?: boolean
}

export type CobaltStatus =
  'error' | 'redirect' | 'stream' |
  'success' | 'rate-limit' | 'picker'

export interface CobaltErrorResponse {
  status: CobaltStatus
  text: string
}

export interface CobaltServerInfo {
  version: string
  commit: string
  branch: string
  name: string
  url: string
  cors: number
  startTime: string
}

export interface PickerItem {
  type?: 'video'
  url: string
  thumb?: string
}

export interface CobaltFetchResult {
  status: CobaltStatus
  url: string
  pickerType?: 'various' | 'images'
  picker?: PickerItem[]
  audio?: string
}

export class Client {
  private readonly axios: AxiosInstance

  constructor (options?: CobaltOptions) {
    this.axios = axios.create({
      baseURL: options?.baseUrl ?? globals.DEFAULT_BASE_API,
      headers: { Accept: 'application/json', 'User-Agent': globals.DEFAULT_USER_AGENT }
    })

    this.axios.interceptors.response.use(
      (value: any): any => value,
      function (error: AxiosError<CobaltErrorResponse>): void {
        if (error?.response?.data) {
          const { status, text } = error.response.data

          if (status === 'error' || status === 'rate-limit') {
            throw new TobaltError(text)
          }
        }

        throw error
      }
    )
  }

  async serverInfo (this: Client): Promise<CobaltServerInfo> {
    const { data } = await this.axios.get('/serverInfo')
    return data satisfies CobaltErrorResponse
  }

  async fetchContent (
    this: Client,
    options: FetchOptions
  ): Promise<SingleContent | DoubleContent | Picker | PickerWithAudio> {
    const response = await this.axios.post(
      '/json',
      { ...options, dubLang: options.dubLang !== undefined }
    )

    const result = response.data satisfies CobaltFetchResult

    switch (result.status) {
      case 'stream':
      case 'redirect':
        return result.audio
          ? new DoubleContent(
              new Content(result.url),
              new Content(result.audio)
            )
          : new SingleContent(
              new Content(result.url)
            )
      case 'picker': {
        const pickerType = result.pickerType === 'various'
          ? PickerType.VARIOUS
          : PickerType.IMAGES
        const contents = result.picker.map(
          (item: PickerItem) => new Content(item.url)
        )

        return result.audio
          ? new PickerWithAudio(pickerType, contents, new Content(result.audio))
          : new Picker(pickerType, contents)
      }
      default:
        throw new TobaltError('Unsupported content')
    }
  }
}
