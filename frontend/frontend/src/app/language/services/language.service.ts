import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { catchError, Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { Language } from '../utils/types/language.type';


/**
 * Language service
 */
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  /**
   * Base url
   * @private
   */
  private baseUrl = 'http://localhost:8000/api';

  /**
   * Constructor of Language service
   * @param http
   */
  constructor(private http: HttpClient){}

  /**
   * Method for getting all user known languages
   */
  public getKnownLanguages(userId: number): Observable<Array<Language>> {
    return this.http.get<Array<Language>>(`${this.baseUrl}/getKnownLanguages/${userId}`).pipe(
      map((languages: Array<Language>) => languages),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for getting all user learning languages
   */
  public getLearningLanguages(userId: number): Observable<Array<Language>> {
    return this.http.get<Array<Language>>(`${this.baseUrl}/getLearningLanguages/${userId}`).pipe(
      map((languages: Array<Language>) => languages),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for creating language
   */
  public createLanguage(
    name: string,
    userId: number,
    levelId: number,
    know: boolean,
    types: Array<number>
  ): Observable<Language> {
    return this.http.post<Language>(`${this.baseUrl}/createLanguage`, {
      name: name,
      user: userId,
      level: levelId,
      know: know,
      types: types
    }).pipe(
      map((language: Language) => language),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for deleting language
   */
  public deleteLanguage(languageId: number): Observable<number> {
    return this.http.delete<number>(`${this.baseUrl}/deleteLanguage/${languageId}`).pipe(
      map(() => languageId),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for updating language
   */
  public updateLanguage(language: Language): Observable<Language> {
    return this.http.post<Language>(`${this.baseUrl}/updateLanguage/${language.id}`, {
      levelId: language.level.id,
      types: language.types.map((type) => type.id)
    }).pipe(
      map(() => language),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }
}
