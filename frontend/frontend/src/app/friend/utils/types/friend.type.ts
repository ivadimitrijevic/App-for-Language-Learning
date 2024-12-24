import { User } from '../../../user/utils/types/user.type';

/**
 * Friend type
 */
export class Friend {
  /**
   * Id
   * @type { number }
   */
  public id: number;
  /**
   * User
   * @type { User }
   */
  public user: User;
  /**
   * Friend
   * @type { User }
   */
  public friend: User;
  /**
   * Active
   * @type { boolean }
   */
  public active: boolean;
  /**
   * Indicator whether review is left
   * @type { boolean }
   */
  public leftReview: boolean;
}
