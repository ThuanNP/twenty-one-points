import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IPoint {
  id?: number;
  date?: Moment;
  exercise?: number;
  meals?: number;
  alcohol?: number;
  note?: string;
  user?: IUser;
}

export class Point implements IPoint {
  constructor(
    public id?: number,
    public date?: Moment,
    public exercise?: number,
    public meals?: number,
    public alcohol?: number,
    public note?: string,
    public user?: IUser
  ) {}
}
