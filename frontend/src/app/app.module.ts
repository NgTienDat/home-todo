import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { ReadtasksComponent } from './readtasks/readtasks.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { reducers } from './app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
@NgModule({
  declarations: [AppComponent, ReadtasksComponent, AddtaskComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
