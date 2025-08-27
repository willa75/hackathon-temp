import { NeighboorhoodEntity } from "../core/types/response";
import { Chance } from "chance";

const chance = new Chance();

export const randomNeighboorhood = () => {
    const resp: NeighboorhoodEntity = {
    id: chance.fbid(),
    name: chance.city(),
    county: chance.city(),
    city: chance.city(),
    avgPopulation: chance.integer({min: 100, max: 33000}),
    avgUnemployed: chance.integer({min: 35, max: 400}),
    avgLaborForce: chance.integer({min: 1000, max: 20000}),
    avgMeanRentScore: chance.floating({min: 0, max: 0.99999999}),
    avgMeanIncomeScore: chance.floating({min: 0, max: 0.99999999}),
    avgEmployedScore: chance.floating({min: 0, max: 0.99999999}),
    avgLivabilityScore: chance.floating({min: 0, max: 0.99999999})
  } 

  return resp;
}