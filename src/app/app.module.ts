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


// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';

// // PrimeNG modules
// import { ButtonModule } from 'primeng/button';
// import { FileUploadModule } from 'primeng/fileupload';
// import { ToolbarModule } from 'primeng/toolbar';
// import { TableModule } from 'primeng/table';
// import { DialogModule } from 'primeng/dialog';
// import { TagModule } from 'primeng/tag';
// import { DropdownModule } from 'primeng/dropdown';
// import { ClientListComponent } from './pages/clients/list/list.component';

// @NgModule({
//   declarations: [
//     AppComponent,
//     ClientListComponent
//   ],
//   imports: [
//     BrowserModule,
//     BrowserAnimationsModule,
//     HttpClientModule,
//     FormsModule,
//     AppRoutingModule,
//     ButtonModule,
//     FileUploadModule,
//     ToolbarModule,
//     TableModule,
//     DialogModule,
//     TagModule,
//     DropdownModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './theme/shared/shared.module';
import { ToastModule } from 'primeng/toast'; 
import { ToolbarModule } from 'primeng/toolbar'; 
import { ToastrModule } from 'ngx-toastr';
//src\app\services\auth.interceptor.ts
import { AuthInterceptor } from '../app/services/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClickOutsideDirective } from './click-outside.directive';





@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    ToastrModule.forRoot(), // Add this line
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ToastModule, 
    ToolbarModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { SharedModule } from './theme/shared/shared.module';
// import { ToastModule } from 'primeng/toast'; // Import ToastModule here
// import { ToolbarModule } from 'primeng/toolbar'; 

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     SharedModule,
//     BrowserAnimationsModule,
//     FormsModule,
//     HttpClientModule,
//     ToastModule, // Add ToastModule here
//     ToolbarModule
    
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule {}




// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

// // project import
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { FormsModule } from '@angular/forms';

// import { SharedModule } from './theme/shared/shared.module';

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     SharedModule,
//     BrowserAnimationsModule,
//     FormsModule,
//     HttpClientModule // Add HttpClientModule here
//   ],
//   providers: [
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule {}
