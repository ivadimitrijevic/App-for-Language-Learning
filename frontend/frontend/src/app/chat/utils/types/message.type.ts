/**
 * Message type
 */
export class Message {
  /**
   * Id
   * @type { number }
   */
  public id: number;
  /**
   * Content
   * @type { string }
   */
  public content: string;
  /**
   * Sent from user
   * @type { number }
   */
  public fromUser: number;
  /**
   * Sent to user
   * @type { number }
   */
  public toUser: number;
  /**
   * Created at
   * @type { Date }
   */
  public createdAt: Date;
}
