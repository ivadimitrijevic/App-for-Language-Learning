import { User } from '../../../user/utils/types/user.type';
import { LanguageLevel } from './language-level.type';
import { TypeOfLearning } from './type-of-learning.type';

/**
 * Language type
 */
export class Language {
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
   * User
   * @type { User }
   */
  public user: User;
  /**
   * Level of knowledge
   * @type { LanguageLevel }
   */
  public level: LanguageLevel;
  /**
   * Indicator if the user know the language or is in learning process
   * @type { boolean }
   */
  public know: boolean;
  /**
   * Types of learning
   * @type { Array<TypeOfLearning> }
   */
  public types: Array<TypeOfLearning>;
}
