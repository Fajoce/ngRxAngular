import { Component } from '@angular/core';
import { SpinnerServiceService } from '../../services/spinner-service.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="spinner-overlay" *ngIf="spinnerService.loading$ | async">
      <mat-progress-spinner color="accent" mode="indeterminate"></mat-progress-spinner>
    </div>
  `,
  styles: [`
    .spinner-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: rgba(255,255,255,0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
  `]
})
export class SpinnerComponent {
constructor(public spinnerService: SpinnerServiceService) {}
}

