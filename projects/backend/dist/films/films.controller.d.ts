import { FilmsService } from './films.service';
export declare class FilmsController {
    private readonly filmsService;
    constructor(filmsService: FilmsService);
    getAllFilms(): Promise<import("rxjs").Observable<import("axios").AxiosResponse<string[], any>>>;
    getFilm(id: string): Promise<any>;
}
