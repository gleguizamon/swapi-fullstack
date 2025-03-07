import { PeopleService } from './people.service';
export declare class PeopleController {
    private readonly peopleService;
    constructor(peopleService: PeopleService);
    getAllPeople(): Promise<import("rxjs").Observable<import("axios").AxiosResponse<string[], any>>>;
    getPerson(id: string): Promise<any>;
}
