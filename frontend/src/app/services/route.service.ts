import { Injectable } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  getPathFromRoute(route: ActivatedRoute): string {
    let path = '';
    if (route) {
      path = route.snapshot.url.map(segment => segment.path).join('/');
      if (route.firstChild) {
        path += '/' + this.getPathFromRoute(route.firstChild);
      }
    }
    return path;
  }
}
