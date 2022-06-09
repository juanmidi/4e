import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';

// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatListModule } from '@angular/material/list';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatToolbarModule } from '@angular/material/toolbar';

import { MisMateriasModule } from '../app/layout/mis-materias/mis-materias.module';
import { AsistenciaModule } from '../app/layout/asistencia/asistencia.module';
import { PerfilModule } from '../app/layout/perfil/perfil.module';

// import { RelojModule } from '../app/layout/reloj/reloj.module';

// import {MatSelectModule} from '@angular/material/select';
// // import { MisMateriasModule } from '../app/layout/mis-materias/mis-materias.module';

// import {MatInputModule} from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { QuillModule } from 'ngx-quill';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './shared/services/data.service';
import { JwtInterceptor } from './shared/services/auth/jwt-interceptor';

import { ProyectosModule } from '../app/layout/proyectos/proyectos.module';
import { QrScanComponent } from './qr-scan/qr-scan.component';

// import { FlexLayoutModule } from '@angular/flex-layout';
// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-javascript/sb-admin-material/master/dist/assets/i18n/',
        '.json'
    );*/
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};



@NgModule({
    declarations: [
        AppComponent,
        QrScanComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        OverlayModule,
        HttpClientModule,
        MisMateriasModule,
        AsistenciaModule,
        PerfilModule,
        ProyectosModule,
        // FlexLayoutModule,
        // RelojModule,
        // MatSelectModule, MatInputModule,
        FormsModule,
        // QuillModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
    ],
    providers: [DataService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
          }
        ],
    bootstrap: [AppComponent]
})
export class AppModule {}
