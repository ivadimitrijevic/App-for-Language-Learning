import { User } from '../../../user/utils/types/user.type';

/**
 * Notification type
 */
export class Notification {
  /**
   * Id
   * @type { number }
   */
  public id: number;
  /**
   * Sent from user
   * @type { User }
   */
  public fromUser: User;
  /**
   * Sent to user
   * @type { User }
   */
  public toUser: User;
  /**
   * Text
   * @type { string }
   */
  public text: string;
  /**
   * Type of notification
   * @type { string }
   */
  public type: string;
  /**
   * Indicator whether notification is seen
   * @type { boolean }
   */
  public seen: boolean;
}
