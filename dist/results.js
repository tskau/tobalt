"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PickerWithAudio = exports.Picker = exports.DoubleContent = exports.SingleContent = void 0;
class SingleContent {
    constructor(content) {
        this.content = content;
    }
}
exports.SingleContent = SingleContent;
class DoubleContent {
    constructor(video, audio) {
        this.video = video;
        this.audio = audio;
    }
}
exports.DoubleContent = DoubleContent;
class Picker {
    constructor(type, items) {
        this.type = type;
        this.items = items;
    }
}
exports.Picker = Picker;
class PickerWithAudio {
    constructor(type, items, audio) {
        this.type = type;
        this.items = items;
        this.audio = audio;
    }
}
exports.PickerWithAudio = PickerWithAudio;