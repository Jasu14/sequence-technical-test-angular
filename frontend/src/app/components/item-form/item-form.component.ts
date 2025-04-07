import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Entity, HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';
import { RouteService } from '../../services/route.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    TranslateModule,
    ReactiveFormsModule
  ],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css'
})
export class ItemFormComponent {

  currentPath: string = "";
  listElements$: any = this.httpService.items$;
  item: any;
  itemsForSelector: any;
  itemForm!: FormGroup;
  loading$ = this.httpService.loading$;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder, private routeService: RouteService, private activatedRoute: ActivatedRoute, private httpService: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.currentPath = this.routeService.getPathFromRoute(this.activatedRoute);
    var id = this.routeService.getIdFromRoute(this.activatedRoute);

    switch(this.currentPath) {
      case "songs":
        this.httpService.getList("artists");

        this.itemForm = this.fb.group({
          title: ['', Validators.required],
          poster: ['', Validators.required],
          genre: ['', Validators.required],
          year: [1900, Validators.required],
          duration: ['', Validators.required],
          rating: [0, Validators.required],
          artist: [0, Validators.required]
        });
      break;
      case "artists":
        this.httpService.getList("songs");

        this.itemForm = this.fb.group({
          name: ['', Validators.required],
          bornCity: ['', Validators.required],
          birthdate: ['', Validators.required],
          img: ['', Validators.required],
          rating: [0, Validators.required],
          songs: [[], Validators.required]
        });
      break;
      case "companies":
        this.httpService.getList("songs");

        this.itemForm = this.fb.group({
          name: ['', Validators.required],
          country: ['', Validators.required],
          createYear: ['', Validators.required],
          employees: [1900, Validators.required],
          rating: ['', Validators.required],
          songs: [[], Validators.required]
        });
      break;
    }

    if(id == "") {
      this.isEditMode = false;
      this.httpService.loadingSubject.next(false);
    } else {
      this.isEditMode = true;

      this.httpService.getDetails(this.currentPath, this.routeService.getIdFromRoute(this.activatedRoute)).then((response) => {
        this.item = response;
        this.itemForm.patchValue(this.item);

        this.httpService.loadingSubject.next(false);
      });
    }

    if (this.item) {
      this.isEditMode = true;
    }
  }

  onSubmit(): void {
    if (this.itemForm?.valid) {
      var formData: Entity = this.itemForm.value;

      if (this.isEditMode) {
        formData.id = parseInt(this.routeService.getIdFromRoute(this.activatedRoute));
        this.httpService.updateElement(this.currentPath, formData).then((response) => {
          this.httpService.loadingSubject.next(false);
          this.router.navigate([`/${this.currentPath}/${response.id}`]);
        });
      } else {
        this.httpService.createElement(this.currentPath, formData).then((response) => {
          this.httpService.loadingSubject.next(false);
          this.router.navigate([`/${this.currentPath}/${response.id}`]);
        });
      }
    }
  }

  getDetailsLink(id: string) {
    return `${this.currentPath}/${id}`;
  }
}
