import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PortalComponent } from './portal/portal.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { UsersService } from './services/users.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SeguridadService } from './models/seguridad.service';

import { ProductComponent } from './product/product.component';
import { LoadBalanceComponent } from './product/loadBalance/loadBalance.component';
import { WithdrawBalanceComponent } from './product/withdrawBalance/withdrawBalance.component';
import { TransferComponent } from './product/transfer/transfer.component';
import { MovementsComponent } from './product/movements/movements.component';

import { MovementsService } from './models/movements.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PortalComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    LoadBalanceComponent,
    WithdrawBalanceComponent,
    TransferComponent,
    MovementsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
  ],
  providers: [UsersService, SeguridadService, MovementsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
