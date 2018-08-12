export class Event {
  constructor(public type: string,
              public amount: number,
              public category: number,
              public date: Date,
              public description: string,
              public id?: number) {
  }
}
