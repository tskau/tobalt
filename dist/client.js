"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Client = void 0;
const axios_1 = __importDefault(require("axios"));
const error_1 = require("./error");
const globals = __importStar(require("./globals"));
const results_1 = require("./results");
const content_1 = require("./content");
class Client {
    constructor(options) {
        var _a;
        this.axios = axios_1.default.create({
            baseURL: (_a = options === null || options === void 0 ? void 0 : options.baseUrl) !== null && _a !== void 0 ? _a : globals.DEFAULT_BASE_API,
            headers: { Accept: 'application/json', 'User-Agent': globals.DEFAULT_USER_AGENT }
        });
        this.axios.interceptors.response.use((value) => value, function (error) {
            var _a;
            if ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) {
                const { status, text } = error.response.data;
                if (status === 'error' || status === 'rate-limit') {
                    throw new error_1.TobaltError(text);
                }
            }
            throw error;
        });
    }
    serverInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.get('/serverInfo');
            return data;
        });
    }
    fetchContent(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axios.post('/json', Object.assign(Object.assign({}, options), { dubLang: options.dubLang !== undefined }));
            const result = response.data;
            switch (result.status) {
                case 'stream':
                case 'redirect':
                    return result.audio
                        ? new results_1.DoubleContent(new content_1.Content(result.url), new content_1.Content(result.audio))
                        : new results_1.SingleContent(new content_1.Content(result.url));
                case 'picker': {
                    const pickerType = result.pickerType === 'various'
                        ? results_1.PickerType.VARIOUS
                        : results_1.PickerType.IMAGES;
                    const contents = result.picker.map((item) => new content_1.Content(item.url));
                    return result.audio
                        ? new results_1.PickerWithAudio(pickerType, contents, new content_1.Content(result.audio))
                        : new results_1.Picker(pickerType, contents);
                }
                default:
                    throw new error_1.TobaltError('Unsupported content');
            }
        });
    }
}
exports.Client = Client;
