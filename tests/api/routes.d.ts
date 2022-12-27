import { OwlRoute, TypeOwlRouter } from "extras";
declare class TestRoute implements OwlRoute {
    path: string;
    router: TypeOwlRouter;
    private controller;
    constructor();
    Routes(): void;
}
export default TestRoute;
