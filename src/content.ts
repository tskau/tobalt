import { Readable } from 'node:stream'
import axios from 'axios'
import fs from 'node:fs'

export class Content {
  constructor (public readonly url: string) {}

  async save(this: Content, path: string): Promise<void> {
    const readableStream = await this.stream()
    const writableStream = fs.createWriteStream(path)

    function writeToFile (
      this: Content,
      resolve: CallableFunction,
      reject: CallableFunction
    ): void {
      function onError (error: Error): any {
        return reject(error)
      }

      function onFinish (): any {
        return resolve()
      }

      readableStream.on('error', onError)
      writableStream.on('error', onError)

      readableStream
        .pipe(writableStream)
        .on('error', onError)
        .on('finish', onFinish)
    }

    return new Promise(
      writeToFile.bind(this)
    )
  }

  async stream (this: Content): Promise<Readable> {
    const { data } = await axios.get(
      this.url,
      { responseType: 'stream' }
    )

    return data
  }
}
