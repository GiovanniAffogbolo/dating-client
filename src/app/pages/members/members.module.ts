import { NgModule } from '@angular/core';

import { MembersRoutingModule } from './members-routing.module';
import { FormsModule } from "@angular/forms";
import { SharedModule } from "@shared/shared.module";
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from "ngx-bootstrap/tabs";
import { TagInputModule } from 'ngx-chips';

import { MembersStoreModule } from "@members/store/members-store.module";

import {
  MemberDetailsComponent,
  MembersComponent,
  MembersSearchComponent
} from '@members/containers';

import {
  MemberCardComponent,
  MemberDetailsCardComponent,
  MembersSearchFormComponent
} from '@members/components';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { SettingsStoreModule } from "@settings/store/settings-store.module";


/**
 * MembersModule and MembersStoreModule will be lazy loaded.
 * In this way we don't initialize the members store when it is not used.
 **/

@NgModule({
  declarations: [
    MembersComponent,
    MemberCardComponent,
    MemberDetailsComponent,
    MemberDetailsCardComponent,

    MembersSearchComponent,
    MembersSearchFormComponent,
  ],
  imports: [
    SharedModule,
    MembersRoutingModule,
    MembersStoreModule,

    // for the moment Settings Store is loaded also here because of profile page
    // will be changed later, because another profile page will be created
    SettingsStoreModule,

    TagInputModule,
    CarouselModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule,
    BsDropdownModule.forRoot({
      isAnimated: true,
      autoClose: true
    }),
  ]
})
export class MembersModule {}


