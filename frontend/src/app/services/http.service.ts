import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, firstValueFrom, Observable } from 'rxjs';
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

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  getList(entity: string): void {
    this.loadingSubject.next(true);
    
    this.http.get<Entity[]>(`${this.apiUrl}/${entity}`)
      .pipe(
        finalize(() => this.loadingSubject.next(false)),
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
