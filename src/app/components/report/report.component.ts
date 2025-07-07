// Report Component with Angular Material
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadCategoriaReporte } from '../../store/category/category-action';
import { selectCategoryReport } from '../../store/category/category-selector';
import { Report } from '../../models/report';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule
  ],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  private store = inject(Store);
  report$: Observable<Report[]> = this.store.select(selectCategoryReport);
  displayedColumns: string[] = ['categoryName', 'count', 'average', 'max', 'min'];

  ngOnInit(): void {
    this.store.dispatch(loadCategoriaReporte());
  }
}
