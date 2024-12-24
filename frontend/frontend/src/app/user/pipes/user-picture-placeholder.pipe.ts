import { Pipe, PipeTransform } from '@angular/core';

/**
 * PicturePlaceholder pipe
 */
@Pipe({
  name: 'picturePlaceholder',
  standalone: true,
})
export class UserPicturePlaceholderPipe implements PipeTransform {
  /**
   * Method for returning first letter of name and first letter of surname
   * @param { string } name
   * @param { string } surname
   */
  public transform(name: string, surname: string): string {
    return name.at(0).toUpperCase() + surname.at(0).toUpperCase();
  }
}
