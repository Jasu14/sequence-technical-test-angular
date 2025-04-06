import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, firstValueFrom, Observable } from 'rxjs';
import { Song } from '../models/song';
import { Artist } from '../models/artist';
import { Company } from '../models/company';

export type Entity = Song | Artist | Company;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private itemsSubject = new BehaviorSubject<Entity[]>([]);
  public items$: Observable<Entity[]> = this.itemsSubject.asObservable();
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  getList(entity: string): void {
    this.http.get<Entity[]>(`${this.apiUrl}/${entity}`)
      .pipe(
        catchError(error => {
          console.error("get list error: ", error);
          return [];
        })
      )
      .subscribe(items => {
        this.itemsSubject.next(items);
      });
  }
}
