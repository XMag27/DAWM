import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidenavComponent } from './Componentes/sidenav/sidenav.component';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { ConsejosComponent } from './Componentes/consejos/consejos.component';
import { EstadisticasComponent } from './Componentes/estadisticas/estadisticas.component';
import { MainComponent } from './Componentes/main/main.component';
import { InfogeneralComponent } from './Componentes/infogeneral/infogeneral.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCardModule} from '@angular/material/card';
import { CardComponent } from './Componentes/card/card.component';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { HasbullaComponent } from './hasbulla/hasbulla.component';






@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ConsejosComponent,
    EstadisticasComponent,
    MainComponent,
    CardComponent,
    InfogeneralComponent,
    HasbullaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
