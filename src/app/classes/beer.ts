import { BeerType } from "../enums/beer-type";

export class Beer {
    constructor(
      public _id: string,
      public name: string,
      public type: BeerType,
      public alcohol: number,
      public ibu: number,
      public image: string,
      public description?: string
    ) {}
}