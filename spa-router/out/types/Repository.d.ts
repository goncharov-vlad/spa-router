import { Route, ConfigRoutes } from './types';
export default class Repository {
    private routes;
    constructor(stack: ConfigRoutes);
    findByPath(path: string): Route | null;
    findByPathTemplate(pathTemplate: string): Route | null;
}
