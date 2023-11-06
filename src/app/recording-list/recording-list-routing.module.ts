import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordingListPage } from './recording-list.page';

const routes: Routes = [
  {
    path: '',
    component: RecordingListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordingListPageRoutingModule {}
