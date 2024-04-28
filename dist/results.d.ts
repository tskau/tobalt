import { Content } from './content';
export declare enum PickerType {
    VARIOUS = "various",
    IMAGES = "images"
}
export declare class SingleContent {
    readonly content: Content;
    constructor(content: Content);
}
export declare class Picker {
    readonly type: PickerType;
    readonly items: Content[];
    constructor(type: PickerType, items: Content[]);
}
export declare class PickerWithAudio {
    readonly type: PickerType;
    readonly items: Content[];
    readonly audio: Content;
    constructor(type: PickerType, items: Content[], audio: Content);
}
