import { Picker, PickerWithAudio, SingleContent } from './results';
export interface CobaltOptions {
    baseUrl?: string;
}
export interface FetchOptions {
    url: string;
    vCodec?: 'h264' | 'av1' | 'vp9';
    vQuality?: string;
    aFormat?: 'best' | 'mp3' | 'ogg' | 'wav' | 'opus';
    filenamePattern?: 'classic' | 'pretty' | 'basic' | 'nerdy';
    isAudioOnly?: boolean;
    isTTFullAudio?: boolean;
    isAudioMuted?: boolean;
    dubLang?: string;
    disableMetadata?: boolean;
    twitterGif?: boolean;
    vimeoDash?: boolean;
}
export type CobaltStatus = 'error' | 'redirect' | 'stream' | 'success' | 'rate-limit' | 'picker';
export interface CobaltErrorResponse {
    status: CobaltStatus;
    text: string;
}
export interface CobaltServerInfo {
    version: string;
    commit: string;
    branch: string;
    name: string;
    url: string;
    cors: number;
    startTime: string;
}
export interface PickerItem {
    type?: 'video';
    url: string;
    thumb?: string;
}
export interface CobaltFetchResult {
    status: CobaltStatus;
    url: string;
    pickerType?: 'various' | 'images';
    picker?: PickerItem[];
    audio?: string;
}
export declare class Client {
    private readonly axios;
    constructor(options?: CobaltOptions);
    serverInfo(this: Client): Promise<CobaltServerInfo>;
    fetchContent(this: Client, options: FetchOptions): Promise<SingleContent | Picker | PickerWithAudio>;
}
