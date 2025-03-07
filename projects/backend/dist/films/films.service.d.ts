import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
export declare class FilmsService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getFilms(): Promise<Observable<AxiosResponse<string[]>>>;
    getFilmById(id: string): Promise<any>;
}
