import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
export declare class PeopleService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getPeople(): Promise<Observable<AxiosResponse<string[]>>>;
    getPersonById(id: string): Promise<any>;
}
