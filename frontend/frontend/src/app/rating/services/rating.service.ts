import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { catchError, Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

import { Rating } from '../utils/types/rating';

/**
 * Rating service
 */
@Injectable({
  providedIn: 'root'
})
export class RatingService {
  /**
   * Base url
   * @private
   */
  private baseUrl = 'http://localhost:8000/api';

  /**
   * Constructor of Rating service
   * @param http
   */
  constructor(private http: HttpClient){}

  /**
   * Method for getting all ratings from user
   */
  public getUsersRatings(userId: number): Observable<Array<Rating>> {
    return this.http.get<Array<Rating>>(`${this.baseUrl}/getRatings/${userId}`).pipe(
      map((data: any) => data.ratings),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for creating rating
   */
  public createRating(fromUser: number, toUser: number, rating: number, text: string): Observable<Rating> {
    return this.http.post<Rating>(`${this.baseUrl}/createRating`, {
      fromUser, toUser, rating, text
    }).pipe(
      map((rating: Rating) => rating),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }
}
