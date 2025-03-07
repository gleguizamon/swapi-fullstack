import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
export declare class StarshipsService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getStarships(): Promise<Observable<AxiosResponse<string[]>>>;
    getStarshipById(id: string): Promise<any>;
}
