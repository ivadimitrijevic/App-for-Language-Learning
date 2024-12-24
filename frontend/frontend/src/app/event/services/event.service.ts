import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { catchError, Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

import { Event} from '../utils/types/event.type';
import { User } from '../../user/utils/types/user.type';

/**
 * Event service
 */
@Injectable({
  providedIn: 'root'
})
export class EventService {
  /**
   * Base url
   * @private
   */
  private baseUrl = 'http://localhost:8000/api';

  /**
   * Constructor of Event service
   * @param http
   */
  constructor(private http: HttpClient){}

  /**
   * Method for getting all events
   */
  public getAll(city?: string, country?: string, language?: string, date?: Date, page?: number): Observable<any> {
    let params = new HttpParams();
    if (city) {
      params = params.set('city', city);
    }
    if (country) {
      params = params.set('country', country);
    }
    if (language) {
      params = params.set('language', language);
    }
    if (date) {
      params = params.set('date', date.toString());
    }
    if (page) {
      params = params.set('page', page);
    }
    return this.http.get(`${this.baseUrl}/getEvents`, { params }).pipe(
      map((data: any) => data),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for creating event
   */
  public createEvent(
    eventMaker: number, name: string, description: string, city: string, country: string, address: string, language: string, date: Date, time: string, maxPeople: number, picture?: string
  ): Observable<Event> {
    return this.http.post<Event>(`${this.baseUrl}/createEvent`, {
      eventMaker, name, description, city, country, address, language, date, time, maxPeople, picture
    }).pipe(
      map((event: Event) => event),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for updating event
   */
  public updateEvent(
    id: number, eventMaker: number, name: string, description: string, city: string, country: string, address: string, language: string, date: Date, time: string, maxPeople: number, picture?: string
  ): Observable<Event> {
    return this.http.post<Event>(`${this.baseUrl}/updateEvent/${id}`, {
      eventMaker, name, description, city, country, address, language, date, time, maxPeople, picture
    }).pipe(
      map((event: Event) => event),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for registering user for event
   */
  public registerForEvent(
    user: User, event: Event
  ): Observable<User> {
    return this.http.post(`${this.baseUrl}/createEventUser`, {
      userId: user.id, eventId: event.id
    }).pipe(
      map(() => user),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for removing user from event
   */
  public removeUserFromEvent(
    user: User, eventId: number
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}/deleteEventUser`, {
      userId: user.id, eventId: eventId
    }).pipe(
      map(() =>  user, eventId ),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for getting user's events
   */
  public getUserEvents(
    userId: number
  ): Observable<Array<Event>> {
    return this.http.get<Array<Event>>(`${this.baseUrl}/getUserEvents/${userId}`).pipe(
      map((events: Array<Event>) => events),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for getting users registered for event
   */
  public getEventUsers(
    eventId: number
  ): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.baseUrl}/getEventUsers/${eventId}`).pipe(
      map((users: Array<User>) => users),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }
}
