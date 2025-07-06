import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-layout',
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule],
    template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav mode="side" opened class="sidenav" fixedInViewport>
        <mat-toolbar color="secondary">📦 Mi Tienda</mat-toolbar>
        <mat-nav-list>
          <a mat-list-item routerLink="/list" routerLinkActive="active-link">
            <mat-icon>inventory_2</mat-icon>
            <span class="ms-2">Productos</span>
          </a>
          <a mat-list-item routerLink="/categories" routerLinkActive="active-link">
            <mat-icon>category</mat-icon>
            <span class="ms-2">Categorías</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content class="main-content">
        <mat-toolbar color="primary">
          <span>Panel Principal</span>
        </mat-toolbar>
        <div class="content p-4">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }

    .sidenav {
      width: 250px;
    }

    .main-content {
      background: #f4f6f9;
      min-height: 100vh;
    }

    .active-link {
      background: rgba(0, 0, 0, 0.1);
      font-weight: bold;
    }

    .mat-icon {
      color: #3f51b5;
    }

    .mat-toolbar.mat-primary {
      position: sticky;
      top: 0;
      z-index: 1;
    }
  `]
})

export class SidebarLayoutComponent {

}
