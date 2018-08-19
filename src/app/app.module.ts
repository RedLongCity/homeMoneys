import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {AppRoutingModule} from './app-routing.module';
import {UsersService} from './shared/services/users.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './shared/auth.service';
import {SystemModule} from './system/system.module';
import {ValidService} from './shared/services/valid.service';
import {BillService} from './system/shared/services/bill.service';
import {BillLimitValidator} from './shared/validator/bill.limit.validator';
import {CategoryService} from './system/shared/services/category.service';
import {EventService} from './system/shared/services/event.service';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule,
    SystemModule,
    CommonModule
  ],
  providers: [UsersService,
    AuthService,
    ValidService,
    BillLimitValidator,
    BillService,
    CategoryService,
    EventService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
