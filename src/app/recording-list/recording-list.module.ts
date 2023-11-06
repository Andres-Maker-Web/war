import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordingListPageRoutingModule } from './recording-list-routing.module';

import { RecordingListPage } from './recording-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordingListPageRoutingModule
  ],
  declarations: [RecordingListPage]
})
export class RecordingListPageModule {}
