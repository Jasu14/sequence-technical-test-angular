import { Component } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { HttpService } from '../../services/http.service';
import { RouteService } from '../../services/route.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    TranslateModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  currentPath: string = "";
  element: any;
  listElements$: any = this.httpService.items$;
  loading$ = this.httpService.loading$;

  constructor(private httpService: HttpService, private routeService: RouteService, private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    this.currentPath = this.routeService.getPathFromRoute(this.activatedRoute);

    this.httpService.getDetails(this.currentPath, this.routeService.getIdFromRoute(this.activatedRoute)).then((response) => {
      this.element = response;

      switch(this.currentPath) {
        case "songs": this.httpService.getList("artists"); break;
        case "artists": this.httpService.getList("songs"); break;
        case "companies": this.httpService.getList("songs"); break;
      }

      this.httpService.loadingSubject.next(false);
    });
  }

  getUpdateLink(id: string) {
    return `${this.currentPath}/${id}/update`;
  }

  getDeleteLink(id: string) {
    return `${this.currentPath}/${id}/delete-confirmation`;
  }

  objectKeys(obj: any) {
    return Object.keys(obj).filter((key) => {
      return key != "id" && key != "img" && key != "poster";
    });
  }
}
