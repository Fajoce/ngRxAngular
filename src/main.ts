import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './app/shared/error-interceptor';


bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideRouter(routes),
    {
    provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true }// ✅ Registra las rutas aquí
  ]
}).catch((err) => console.error(err));
