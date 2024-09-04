import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { NgIconsModule } from '@ng-icons/core';
import { hugeDocumentValidation, hugeHome03, hugeLogout03, hugeShoppingCart01, hugeUser } from '@ng-icons/huge-icons';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    NgIconsModule.withIcons({ hugeDocumentValidation, hugeHome03, hugeShoppingCart01, hugeUser, hugeLogout03 })
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
