import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../services/route.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent
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
}
