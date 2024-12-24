import { User } from './user.type';
import { Language } from '../../../language/utils/types/language.type';
import { TypeOfLearning } from '../../../language/utils/types/type-of-learning.type';

/**
 * Learner type
 */
export class Learner extends User {
  /**
   * Known languages
   * @type { Array<Language> }
   */
  // public knownLanguages: Array<Language>;
  /**
   * Learning languages
   * @type { Array<Language> }
   */
  public learningLanguages: Array<Language>;
  // public learningLanguages: Array<{ language: Language, types: Array<TypeOfLearning> }>;
}
