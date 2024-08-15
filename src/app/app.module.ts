// // angular import
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// // project import
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { SharedModule } from './theme/shared/shared.module';

// @NgModule({
//   declarations: [AppComponent],
//   imports: [BrowserModule, AppRoutingModule, SharedModule, BrowserAnimationsModule],
//   bootstrap: [AppComponent]
// })
// export class AppModule {}


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './theme/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule // Add HttpClientModule here
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

