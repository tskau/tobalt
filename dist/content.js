"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const axios_1 = __importDefault(require("axios"));
const node_fs_1 = __importDefault(require("node:fs"));
class Content {
    constructor(url) {
        this.url = url;
    }
    save(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const readableStream = yield this.stream();
            const writableStream = node_fs_1.default.createWriteStream(path);
            function writeToFile(resolve, reject) {
                function onError(error) {
                    return reject(error);
                }
                function onFinish() {
                    return resolve();
                }
                readableStream.on('error', onError);
                writableStream.on('error', onError);
                readableStream
                    .pipe(writableStream)
                    .on('error', onError)
                    .on('finish', onFinish);
            }
            return new Promise(writeToFile.bind(this));
        });
    }
    stream() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield axios_1.default.get(this.url, { responseType: 'stream' });
            return data;
        });
    }
}
exports.Content = Content;
