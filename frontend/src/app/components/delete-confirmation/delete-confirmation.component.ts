import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { RouteService } from '../../services/route.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [
    // CommonModule,
    // SpinnerComponent,
    TranslateModule
  ],
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent {

  currentPath: string = "";
  element: any;
  loading$ = this.httpService.loading$;

  constructor(private httpService: HttpService, private routeService: RouteService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.currentPath = this.routeService.getPathFromRoute(this.activatedRoute);

    this.httpService.getDetails(this.currentPath, this.routeService.getIdFromRoute(this.activatedRoute)).then((response) => {
      this.element = response;
      this.httpService.loadingSubject.next(false);
    });
  }

  confirmDelete() {
    this.httpService.deleteElement(this.currentPath, this.routeService.getIdFromRoute(this.activatedRoute)).then((response) => {
      this.httpService.loadingSubject.next(false);
      this.router.navigate([`/${this.currentPath}`]);
    });
  }

  cancelDelete() {
    this.router.navigate([`/${this.currentPath}/${this.routeService.getIdFromRoute(this.activatedRoute)}`]);
  }
}
