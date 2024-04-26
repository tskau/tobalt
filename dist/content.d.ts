/// <reference types="node" />
import { Readable } from 'node:stream';
export declare class Content {
    readonly url: string;
    constructor(url: string);
    save(this: Content, path: string): Promise<void>;
    stream(this: Content): Promise<Readable>;
}
