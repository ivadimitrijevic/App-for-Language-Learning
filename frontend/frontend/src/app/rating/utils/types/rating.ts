import { User } from '../../../user/utils/types/user.type';

/**
 * Rating type
 */
export class Rating {
  /**
   * Id
   * @type { number }
   */
  public id: number;
  /**
   * Left from user
   * @type { User }
   */
  public fromUser: User;
  /**
   * Left to User
   * @type { User }
   */
  public toUser: User;
  /**
   * Rating left
   * @type { number }
   */
  public rating: number;
  /**
   * Text of rating
   *@type { string }
   */
  public text: string;
}
