import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
export declare class PlanetsService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getPlanets(): Promise<Observable<AxiosResponse<string[]>>>;
    getPlanetById(id: string): Promise<any>;
}
