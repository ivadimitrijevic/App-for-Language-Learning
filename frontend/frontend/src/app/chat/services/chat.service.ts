import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { Message } from '../utils/types/message.type';

/**
 * Chat service
 */
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  /**
   * Base url
   * @private
   */
  private baseUrl = 'http://localhost:8000/api';

  /**
   * Constructor of Chat service
   * @param http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Method for getting all the messages from two users
   * @param { number } fromUser
   * @param { number } toUser
   * @param { number } page
   */
  public getMessages(fromUser: number, toUser: number, page?: number): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page);
    }
    return this.http.get(`${this.baseUrl}/messages/${fromUser}/${toUser}`, { params }).pipe(
      map((data: any) => data),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for creating message
   * @param { number } fromUser
   * @param { number } toUser
   * @param { string } content
   */
  public createMessage(fromUser: number, toUser: number, content: string): Observable<Message> {
    return this.http.post<Message>(`${this.baseUrl}/messages`, {
      fromUser, toUser, content
    }).pipe(
      map((message: Message) => message),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }
}
