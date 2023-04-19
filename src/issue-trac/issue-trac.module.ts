import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueTracDirective } from './issue-trac.directive';



@NgModule({
  declarations: [
    IssueTracDirective
  ],
  exports: [
    IssueTracDirective
  ],
  imports: [
    CommonModule
  ]
})
export class IssueTracModule { }
