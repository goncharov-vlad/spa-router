import { Config } from './types';
declare class Router {
    private notFoundAction;
    private repository;
    constructor(config: Config);
    get currentUrl(): string;
    private initLinks;
    private initMutationObserver;
    private onClickEvent;
    private execute;
}
export default Router;
