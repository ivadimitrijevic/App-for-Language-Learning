import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { catchError, Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

import { Notification } from '../utils/types/notification.type';


/**
 * Notification service
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  /**
   * Base url
   * @private
   */
  private baseUrl = 'http://localhost:8000/api';

  /**
   * Constructor of Notification service
   * @param http
   */
  constructor(private http: HttpClient){}

  /**
   * Method for getting all notifications from user
   */
  public getNotifications(userId: number): Observable<Array<Notification>> {
    return this.http.get<Array<Notification>>(`${this.baseUrl}/getNotifications/${userId}`).pipe(
      map((data: any) => data.notifications),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for creating notification
   */
  public createNotification(
    fromUser: number,
    toUser: number,
    text: string,
    notificationType: string,
    seen: boolean
  ): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}/createNotification`, {
      fromUser, toUser, text, seen, type: notificationType
    }).pipe(
      map((notification: Notification) => notification),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for updating notification
   */
  public updateNotification(id: number, seen: boolean): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}/updateNotification/${id}`, {
      seen
    }).pipe(
      map((notification: Notification) => notification),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }
}
