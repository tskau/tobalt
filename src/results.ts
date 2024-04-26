import { Content } from './content'

export class SingleContent {
  constructor (public readonly content: Content) {}
}

export class DoubleContent {
  constructor (
    public readonly video: Content,
    public readonly audio: Content
  ) {}
}

export class Picker {
  constructor (
    public readonly type: Tobalt.PickerType,
    public readonly items: Content[]
  ) {}
}

export class PickerWithAudio {
  constructor (
    public readonly type: Tobalt.PickerType,
    public readonly items: Content[],
    public readonly audio: Content
  ) {}
}
