import { Action, Params, PathTemplate } from './types';
export default class Route {
    private action;
    pathTemplate: PathTemplate;
    constructor(pathTemplate: string, action: Action);
    makePath(values: Params): string;
    isPathMatch(path: string): boolean;
    execute(values: Params): void;
    fetchPathValues(path: string): Params;
}
