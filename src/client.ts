import axios, { AxiosError, AxiosInstance } from 'axios'
import { TobaltError } from './error'
import * as globals from './globals'
import {
  DoubleContent,
  Picker,
  PickerWithAudio,
  SingleContent
} from './results'
import { Content } from './content'

export class Client {
  private readonly axios: AxiosInstance

  constructor (options?: Tobalt.CobaltOptions) {
    this.axios = axios.create({
      baseURL: options?.baseUrl ?? globals.DEFAULT_BASE_API,
      headers: { Accept: 'application/json', 'User-Agent': globals.DEFAULT_USER_AGENT }
    })

    this.axios.interceptors.response.use(
      (value: any): any => value,
      function (error: AxiosError<Tobalt.CobaltErrorResponse>): void {
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

  async serverInfo (this: Client): Promise<Tobalt.CobaltServerInfo> {
    const { data } = await this.axios.get('/serverInfo')
    return data satisfies Tobalt.CobaltErrorResponse
  }

  async fetchContent (
    this: Client,
    options: Tobalt.FetchOptions
  ): Promise<SingleContent | DoubleContent | Picker | PickerWithAudio> {
    const response = await this.axios.post(
      '/json',
      { ...options, dubLang: options.dubLang !== undefined }
    )

    const result = response.data satisfies Tobalt.CobaltFetchResult

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
          ? Tobalt.PickerType.VARIOUS
          : Tobalt.PickerType.IMAGES
        const contents = result.picker.map(
          (item: Tobalt.PickerItem) => new Content(item.url)
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
