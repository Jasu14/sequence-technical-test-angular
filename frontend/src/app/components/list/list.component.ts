import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../services/route.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit, AfterViewInit {

  currentPath: string = "";
  listElements: any = [];
  templateToUse!: TemplateRef<any>
  displayedColumns: string[] = [];

  @ViewChild('cardSongsViewTemplate') cardSongsViewTemplate!: TemplateRef<any>;
  @ViewChild('cardArtistsViewTemplate') cardArtistsViewTemplate!: TemplateRef<any>;
  @ViewChild('cardCompaniesViewTemplate') cardCompaniesViewTemplate!: TemplateRef<any>;

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute, private routeService: RouteService) { }

  ngOnInit(): void {
    this.currentPath = this.routeService.getPathFromRoute(this.activatedRoute);

    this.httpService.getList(this.currentPath).then(
      data => {
        this.listElements = data;
        this.displayedColumns = Object.keys(this.listElements[0]);
      },
      error => {
        console.error("Error on init list: ", error);
      }
    )
  }

  ngAfterViewInit(): void {
    this.setTemplateToUse(this.currentPath);
  }

  setTemplateToUse(path: string) {
    switch(path) {
      case "songs": this.templateToUse = this.cardSongsViewTemplate; break;
      case "artists": this.templateToUse = this.cardArtistsViewTemplate; break;
      case "companies": this.templateToUse = this.cardCompaniesViewTemplate; break;
    }
  }
}
