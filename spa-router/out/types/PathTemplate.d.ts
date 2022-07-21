import { Params, Part, Parts } from './types';
export default class PathTemplate {
    private parts;
    template: string;
    constructor(pathTemplate: string);
    fetchPathValues(path: string): Params;
    findPartByIndex(index: number): Part | null;
    getValueParts(): Parts;
    makePath(values: Params): string;
    isPathMatch(path: string): boolean;
}
