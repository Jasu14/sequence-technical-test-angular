import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../services/route.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    TranslateModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  currentPath: string = "";
  listElements$: any = this.httpService.items$;
  loading$ = this.httpService.loading$;

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute, private routeService: RouteService) { }

  ngOnInit(): void {
    this.currentPath = this.routeService.getPathFromRoute(this.activatedRoute);

    this.httpService.getList(this.currentPath);
  }

  getDetailsLink(id: string) {
    return `${this.currentPath}/${id}`;
  }
}
