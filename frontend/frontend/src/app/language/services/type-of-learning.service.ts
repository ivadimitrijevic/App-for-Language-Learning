import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { catchError, Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

import { TypeOfLearning } from '../utils/types/type-of-learning.type';

/**
 * TypeOfLearning service
 */
@Injectable({
  providedIn: 'root'
})
export class TypeOfLearningService {
  /**
   * Base url
   * @private
   */
  private baseUrl = 'http://localhost:8000/api';

  /**
   * Constructor of TypeOfLearning service
   * @param http
   */
  constructor(private http: HttpClient){}

  /**
   * Method for getting all types of learning
   */
  public getTypesOfLearning(): Observable<Array<TypeOfLearning>> {
    return this.http.get<Array<TypeOfLearning>>(`${this.baseUrl}/getTypesOfLearning`).pipe(
      map((types: any) => types.data),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for creating type of learning
   */
  public createTypeOfLearning(name: string): Observable<TypeOfLearning> {
    return this.http.post<TypeOfLearning>(`${this.baseUrl}/createTypeOfLearning`, { name }).pipe(
      map((learningType: TypeOfLearning) => learningType),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for updating type of learning
   */
  public updateTypeOfLearning(typeId: number, name: string): Observable<TypeOfLearning> {
    return this.http.post<TypeOfLearning>(`${this.baseUrl}/updateTypeOfLearning/${typeId}`, { name }).pipe(
      map((learningType: TypeOfLearning) => learningType),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for updating order of types
   * @param { Array<TypeOfLearning> } typesOfLearning
   */
  public updateOrder(typesOfLearning: Array<TypeOfLearning>): Observable<Array<TypeOfLearning>> {
    return this.http.post<Array<TypeOfLearning>>(`${this.baseUrl}/updateOrderTypesOfLearning`, {
      typeIds: typesOfLearning.map((type) => type.id)
    }).pipe(
      map((reorderedTypes: Array<TypeOfLearning>) => reorderedTypes),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }
}
