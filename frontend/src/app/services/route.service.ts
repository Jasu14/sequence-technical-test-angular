import { Injectable } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  getPathFromRoute(route: ActivatedRoute): string {
    let path = '';
    if (route) {
      var current_route = route.parent ?? route;
      path = current_route.snapshot.url.map(segment => segment.path).join('/');
      if (route.firstChild) {
        path += this.getPathFromRoute(route.firstChild);
      }
    }
    return path;
  }

  getIdFromRoute(route: ActivatedRoute): string {
    let id = '';
    if (route) {
      if (route.snapshot.params['id']) {
        id = route.snapshot.params['id'];
      }
      if (route.firstChild) {
        id = this.getIdFromRoute(route.firstChild);
      }
    }
    return id;
  }
}
