"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PickerWithAudio = exports.Picker = exports.SingleContent = exports.PickerType = void 0;
var PickerType;
(function (PickerType) {
    PickerType["VARIOUS"] = "various";
    PickerType["IMAGES"] = "images";
})(PickerType || (exports.PickerType = PickerType = {}));
class SingleContent {
    constructor(content) {
        this.content = content;
    }
}
exports.SingleContent = SingleContent;
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
