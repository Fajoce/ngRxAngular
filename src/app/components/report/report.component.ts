import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadCategoriaReporte } from '../../store/category/category-action';
import { selectCategoryReport } from '../../store/category/category-selector';
import { Report } from '../../models/report';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    NgChartsModule
  ],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  private store = inject(Store);
  report$: Observable<Report[]> = this.store.select(selectCategoryReport);
  displayedColumns: string[] = ['categoryName', 'count', 'average', 'max', 'min'];

  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Promedio por categoría',
        data: [],
        backgroundColor: '#3f51b5'
      }
    ]
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: 'Promedio de Precios por Categoría'
      }
    }
  };

  ngOnInit(): void {
    this.store.dispatch(loadCategoriaReporte());

    this.report$.subscribe(data => {
      if (data) {
        this.chartData.labels = data.map(d => d.categoryName);
        this.chartData.datasets[0].data = data.map(d => d.average);
      }
    });
  }
}
