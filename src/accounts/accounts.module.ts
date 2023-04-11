import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountControlComponent } from './account-control/account-control.component';



@NgModule({
    declarations: [
        AccountControlComponent
    ],
    exports: [
        AccountControlComponent
    ],
    imports: [
        CommonModule
    ]
})
export class AccountsModule { }
