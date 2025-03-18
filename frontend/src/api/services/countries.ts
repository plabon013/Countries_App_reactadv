import { Country } from "../../types/country";
import { api } from "../axios";

export const countriesApi = {
    getAllCountries: (): Promise<Country[]> => api.get('https://restcountries.com/v3.1/all')
    // its first a promise and then we say we will return eventually an array, thats how you pass the type through here
}