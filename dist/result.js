"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Picker = exports.DoubleContent = exports.SingleContent = void 0;
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
}
exports.Picker = Picker;
