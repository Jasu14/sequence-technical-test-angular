import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Song } from '../models/song';
import { Artist } from '../models/artist';
import { Company } from '../models/company';

export type Entity = Song | Artist | Company;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  getList(entity: string): Promise<Entity[]> {
    return firstValueFrom(this.http.get<Entity[]>(`${this.apiUrl}/${entity}`));
  }
}
