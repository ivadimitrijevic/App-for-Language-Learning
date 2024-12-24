import { User } from '../../../user/utils/types/user.type';

/**
 * Event type
 */
export class Event {
  /**
   * Id
   * @type { number }
   */
  public id: number;
  /**
   * Name
   * @type { string }
   */
  public name: string;
  /**
   * Description
   * @type { string }
   */
  public description: string;
  /**
   * City
   * @type { string }
   */
  public city: string;
  /**
   * Country
   * @type { string }
   */
  public country: string;
  /**
   * Address
   * @type { string }
   */
  public address: string;
  /**
   * Language
   * @type { string }
   */
  public language: string;
  /**
   * Maximum number of people that can participate in event
   * @type { number }
   */
  public maxPeople: number;
  /**
   * User that made event
   * @type { User }
   */
  public eventMaker: User;
  /**
   * Date
   * @type { Date }
   */
  public date: Date;
  /**
   * Time
   * @type { string }
   */
  public time: string;
  /**
   * Picture
   * @type { string }
   */
  public picture?: string;
}
