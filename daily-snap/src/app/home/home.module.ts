import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { SlideshowPage } from '../slideshow/slideshow.page';
import { DaysAgoPipe } from '../pipes/days-ago.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, SlideshowPage, DaysAgoPipe ],
  entryComponents:[SlideshowPage]
})
export class HomePageModule {}
