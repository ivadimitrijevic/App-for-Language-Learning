import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { catchError, Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

import { LanguageLevel } from '../utils/types/language-level.type';

/**
 * LanguageLevel service
 */
@Injectable({
  providedIn: 'root'
})
export class LanguageLevelService {
  /**
   * Base url
   * @private
   */
  private baseUrl = 'http://localhost:8000/api';

  /**
   * Constructor of LanguageLevel service
   * @param http
   */
  constructor(private http: HttpClient){}

  /**
   * Method for getting all language levels
   */
  public getLanguageLevels(): Observable<Array<LanguageLevel>> {
    return this.http.get<Array<LanguageLevel>>(`${this.baseUrl}/getLanguageLevels`).pipe(
      map((levels: any) => levels.data),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for creating language level
   */
  public createLanguageLevel(name: string): Observable<LanguageLevel> {
    return this.http.post<LanguageLevel>(`${this.baseUrl}/createLanguageLevel`, { name }).pipe(
      map((level: LanguageLevel) => level),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for updating language level
   */
  public updateLanguageLevel(levelId: number, name: string): Observable<LanguageLevel> {
    return this.http.post<LanguageLevel>(`${this.baseUrl}/updateLanguageLevel/${levelId}`, { name }).pipe(
      map((level: LanguageLevel) => level),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for updating order of language levels
   * @param { Array<LanguageLevel> } levels
   */
  public updateOrder(levels: Array<LanguageLevel>): Observable<Array<LanguageLevel>> {
    return this.http.post<Array<LanguageLevel>>(`${this.baseUrl}/updateOrderLanguageLevels`, {
      levelIds: levels.map((level) => level.id)
    }).pipe(
      map((reorderedLevels: Array<LanguageLevel>) => reorderedLevels),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }
}
