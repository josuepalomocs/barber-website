export default class AppointmentService {
  private readonly _id: number;
  private readonly _name: string;
  private readonly _durationInMinutes: number;
  private readonly _priceInUSD: number;
  public constructor(
    id: number,
    name: string,
    durationInMinutes: number,
    priceInUSD: number
  ) {
    this._id = id;
    this._name = name;
    this._durationInMinutes = durationInMinutes;
    this._priceInUSD = priceInUSD;
  }
}
