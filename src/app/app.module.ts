import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    InputTextModule,
    FormsModule, ReactiveFormsModule,HttpClientModule,
    BrowserAnimationsModule,
    TableModule,
    MessagesModule,
    AppRoutingModule
  ],
  providers: [ {provide: LocationStrategy, useClass: HashLocationStrategy}, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
