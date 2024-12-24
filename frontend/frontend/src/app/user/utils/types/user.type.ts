import { Gender } from './gender.type';
import { Role } from './role.type';

/**
 * User type
 */
export class User {
  public id: number;
  public name: string;
  public surname: string;
  public gender: Gender;
  public city: string;
  public country: string;
  public role: Role;
  public email: string;
  public password: string;
  public active: boolean;
  public description?: string;
  public picture?: string;
  public phoneNumber?: string;
  public age?: number;
  public averageRating?: number;
}
