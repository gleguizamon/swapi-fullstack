import { PlanetsService } from './planets.service';
export declare class PlanetsController {
    private readonly planetsService;
    constructor(planetsService: PlanetsService);
    getAllPlanets(): Promise<import("rxjs").Observable<import("axios").AxiosResponse<string[], any>>>;
    getPlanet(id: string): Promise<any>;
}
