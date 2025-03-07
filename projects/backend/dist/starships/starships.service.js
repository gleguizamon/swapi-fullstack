"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarshipsService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let StarshipsService = class StarshipsService {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getStarships() {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://swapi.dev/api/starships/'));
        return response.data;
    }
    async getStarshipById(id) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://swapi.dev/api/starships/${id}/`));
        const starship = response.data;
        const pilotDetails = await Promise.all(starship.pilots.map(async (pilotUrl) => {
            const pilotResponse = await (0, rxjs_1.firstValueFrom)(this.httpService.get(pilotUrl));
            return pilotResponse.data;
        }));
        const filmDetails = await Promise.all(starship.films.map(async (filmUrl) => {
            const filmResponse = await (0, rxjs_1.firstValueFrom)(this.httpService.get(filmUrl));
            return filmResponse.data;
        }));
        return {
            ...starship,
            pilots: pilotDetails,
            films: filmDetails,
        };
    }
};
exports.StarshipsService = StarshipsService;
exports.StarshipsService = StarshipsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], StarshipsService);
//# sourceMappingURL=starships.service.js.map