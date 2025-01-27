import { BeerType } from "../enums/beer-type";

export class Beer {
    constructor(
      public name: string,
      public type: BeerType,
      public alcohol: number,
      public ibu: number,
      public image: string,
      public description?: string,
      public _id?: string
    ) {}
}