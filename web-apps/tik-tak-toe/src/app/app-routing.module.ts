import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NbThemeModule, NbLayoutModule, NbButtonModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';


const routes: Routes = [];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        NbThemeModule.forRoot({ name: 'cosmic' }),
        NbLayoutModule,
        NbEvaIconsModule,
        NbButtonModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
