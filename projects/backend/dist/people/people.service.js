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
exports.PeopleService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let PeopleService = class PeopleService {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getPeople() {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://swapi.dev/api/people/'));
        return response.data;
    }
    async getPersonById(id) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://swapi.dev/api/people/${id}/`));
        const person = response.data;
        const filmDetails = await Promise.all(person.films.map(async (filmUrl) => {
            const filmResponse = await (0, rxjs_1.firstValueFrom)(this.httpService.get(filmUrl));
            return filmResponse.data;
        }));
        const starshipDetails = await Promise.all(person.starships.map(async (starshipUrl) => {
            const starshipResponse = await (0, rxjs_1.firstValueFrom)(this.httpService.get(starshipUrl));
            return starshipResponse.data;
        }));
        let homeworldDetails = null;
        if (person.homeworld) {
            const homeworldResponse = await (0, rxjs_1.firstValueFrom)(this.httpService.get(person.homeworld));
            homeworldDetails = homeworldResponse.data;
        }
        return {
            ...person,
            films: filmDetails,
            starships: starshipDetails,
            homeworld: homeworldDetails,
        };
    }
};
exports.PeopleService = PeopleService;
exports.PeopleService = PeopleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], PeopleService);
//# sourceMappingURL=people.service.js.map