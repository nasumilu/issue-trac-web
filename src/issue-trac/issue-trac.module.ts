import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueTracDirective } from './issue-trac.directive';
import { IssueComponent } from './issue/issue.component';



@NgModule({
  declarations: [
    IssueTracDirective,
    IssueComponent
  ],
  exports: [
    IssueTracDirective
  ],
  imports: [
    CommonModule
  ]
})
export class IssueTracModule { }
