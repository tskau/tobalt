import { Content } from './content'

export enum PickerType {
  VARIOUS = 'various',
  IMAGES = 'images'
}

export class SingleContent {
  constructor (public readonly content: Content) {}
}

export class Picker {
  constructor (
    public readonly type: PickerType,
    public readonly items: Content[]
  ) {}
}

export class PickerWithAudio {
  constructor (
    public readonly type: PickerType,
    public readonly items: Content[],
    public readonly audio: Content
  ) {}
}
