import Route from './Route';
import Repository from './Repository';
import PathTemplate from './PathTemplate';
import Router from './Router';
declare type Params = {
    [key: string]: string;
};
declare type Action = (values?: Params) => void;
declare type Part = {
    element: string;
    isValue?: true;
};
declare type Parts = Part[];
declare type Routes = Route[];
declare type ConfigRoute = {
    pathTemplate: string;
    action: Action;
};
declare type ConfigRoutes = ConfigRoute[];
declare type Config = {
    stack: ConfigRoutes;
    notFoundAction?: Action;
};
export { Route, Repository, PathTemplate, Part, Params, Action, Parts, Routes, ConfigRoutes, ConfigRoute, Config };
export default Router;
