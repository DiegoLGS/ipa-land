export class Beer {
    constructor(
      public _id: string,
      public name: string,
      public type: string,
      public alcohol: number,
      public ibu: number,
      public image: string,
      public description?: string
    ) {}
}