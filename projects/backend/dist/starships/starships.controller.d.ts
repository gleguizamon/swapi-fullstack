import { StarshipsService } from './starships.service';
export declare class StarshipsController {
    private readonly starshipsService;
    constructor(starshipsService: StarshipsService);
    getAllStarships(): Promise<import("rxjs").Observable<import("axios").AxiosResponse<string[], any>>>;
    getStaship(id: string): Promise<any>;
}
