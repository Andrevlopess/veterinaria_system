export interface ISpecies {
  id: string;
  specie: string;
}

export interface IBreeds {
  id: string;
  breed: string;
  specieId: String;
}

export interface IAnimal {
  id: string;
  name: string;
  microchip: number;
  ownerId: string;
  breedId: string;
  specieId: String;
  age: number;
  gender: string;
  weight: number;
  neutered: boolean;
  vaccinated: boolean;
  breed: string;
  specie: string;
}
