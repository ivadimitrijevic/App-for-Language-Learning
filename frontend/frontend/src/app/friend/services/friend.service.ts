import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { catchError, Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

import { Friend } from '../utils/types/friend.type';

/**
 * Friend service
 */
@Injectable({
  providedIn: 'root'
})
export class FriendService {
  /**
   * Base url
   * @private
   */
  private baseUrl = 'http://localhost:8000/api';

  /**
   * Constructor of Friend service
   * @param http
   */
  constructor(private http: HttpClient){}

  /**
   * Method for getting all friends from user
   */
  public getFriends(userId: number): Observable<Array<Friend>> {
    return this.http.get<Array<Friend>>(`${this.baseUrl}/getFriends/${userId}`).pipe(
      map((data: any) => data.friends),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for creating friend
   */
  public createFriend(
    user: number,
    friend: number,
    active: boolean
  ): Observable<Friend> {
    return this.http.post<Friend>(`${this.baseUrl}/createFriend`, {
      user, friend, active
    }).pipe(
      map((friend: Friend) => friend),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for updating friend
   */
  public updateFriend(fromUser: number, toUser: number, active: boolean): Observable<Friend> {
    return this.http.post<Friend>(`${this.baseUrl}/updateFriend`, {
      fromUser, toUser, active
    }).pipe(
      map((friend: Friend) => friend),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }
}
