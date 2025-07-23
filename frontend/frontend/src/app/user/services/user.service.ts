import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { catchError, Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

import { User } from '../utils/types/user.type';

/**
 * User service
 */
@Injectable({
    providedIn: 'root'
})
export class UserService {
    /**
     * Base url
     * @private
     */
    private baseUrl = 'http://localhost:8000/api';

    /**
     * Constructor of User service
     * @param http
     */
    constructor(private http: HttpClient){}

    /**
     * Method for logging in user
     * @param email
     * @param password
     */
    public login(email: string, password: string): Observable<User | string> {
      return this.http.post<User>(`${this.baseUrl}/login`, { email, password }).pipe(
          map((user: User) => user),
          catchError((error: HttpErrorResponse) => {
              if (error.status === 403) {
                  return 'Email or password are incorrect!';
              } else {
                  return throwError(() => error)
              }
          })
      );
    }

    /**
     * Method for registering user
     * @param name
     * @param surname
     * @param gender
     * @param city
     * @param country
     * @param role
     * @param description
     * @param email
     * @param password
     * @param active
     * @param picture
     * @param phoneNumber
     * @param age
     */
    public register(
      name: string,
      surname: string,
      gender: number,
      city: string,
      country: string,
      role: number,
      email: string,
      password: string,
      active: boolean,
      description?: string,
      picture?: string,
      phoneNumber?: string,
      age?: number,
    ): Observable<User> {
        return this.http.post<User>(`${this.baseUrl}/register`, {
          name,
          surname,
          gender,
          city,
          country,
          role,
          email,
          password,
          active,
          description,
          picture,
          phoneNumber,
          age,
        }).pipe(
            map((user: User) => user),
            catchError((error: HttpErrorResponse) => throwError(() => error))
        );
    }

  /**
   * Method for getting all users
   */
  public getAll(currentUserId: number, city?: string, country?: string, language?: string, page?: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('currentUserId', currentUserId);
    if (city) {
      params = params.set('city', city);
    }
    if (country) {
      params = params.set('country', country);
    }
    if (language) {
      params = params.set('language', language);
    }
    if (page) {
      params = params.set('page', page);
    }
    return this.http.get<any>(`${this.baseUrl}/getUsers`, { params }).pipe(
      map((data: any) => data),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  /**
   * Method for getting all users for admin
   * @param { string } term
   * @param { boolean } onlyActive
   * @param { number } page
   */
  public getAllUsers(term?: string, onlyActive?: boolean, page?: number): Observable<any> {
    let params = new HttpParams();
    if (term) {
      params = params.set('term', term);
    }
    if (onlyActive) {
      params = params.set('onlyActive', onlyActive);
    }
    if (page) {
      params = params.set('page', page);
    }
    return this.http.get(`${this.baseUrl}/getAllUsers`, { params }).pipe(
      map((data: any) => data),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

    /**
     * Method for getting user
     * @param id
     */
    public getUser(id: number): Observable<User> {
      return this.http.get<User>(`${this.baseUrl}/getUser/${id}`).pipe(
          map((user: User) => user),
          catchError((error: HttpErrorResponse) => throwError(() => error))
      );
    }

  /**
   * Method for getting current user
   * @param id
   */
  public getCurrentUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/getUser/${id}`).pipe(
      map((currentUser: User) => currentUser),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

    /**
     * Method for updating user
     * @param { number } userId
     * @param { string } name
     * @param { string } surname
     * @param { number } age
     * @param { number } gender
     * @param { string } phoneNumber
     * @param { string } description
     * @param { string } picture
     * @param { string } city
     * @param { string } country
     */
    public updateUser(userId: number,
                      name: string,
                      surname: string,
                      age: number,
                      gender: number,
                      phoneNumber: string,
                      description: string,
                      picture: string,
                      city: string,
                      country: string): Observable<User> {
        return this.http.post<User>(`${this.baseUrl}/updateUser/${userId}`, {
          userId,
          name,
          surname,
          age,
          gender,
          phoneNumber,
          description,
          picture,
          city,
          country
        }).pipe(
            map((data: any) => data.user),
            catchError((error: HttpErrorResponse) => throwError(() => error))
        );
    }

  /**
   * Method for updating active status of user
   * @param { number } userId
   * @param { boolean } active
   */
    public updateActiveStatus(userId: number, active: boolean): Observable<User> {
      return this.http.post<User>(`${this.baseUrl}/updateUserActiveStatus/${userId}`, { active }).pipe(
        map((data: any) => data.user),
        catchError((error: HttpErrorResponse) => throwError(() => error))
      );
    }
}
