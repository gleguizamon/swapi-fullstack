import { HttpService } from '@nestjs/axios';
export declare class SearchService {
    private readonly httpService;
    constructor(httpService: HttpService);
    search(query: string): Promise<{}>;
}
