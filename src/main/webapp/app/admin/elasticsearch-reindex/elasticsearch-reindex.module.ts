import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TwentyOnePointsAppSharedModule } from '../../shared';

import {
  ElasticsearchReindexComponent,
  ElasticsearchReindexModalComponent,
  ElasticsearchReindexService,
  elasticsearchReindexRoute
} from './';

const ADMIN_ROUTES = [elasticsearchReindexRoute];

@NgModule({
  imports: [TwentyOnePointsAppSharedModule, RouterModule.forRoot(ADMIN_ROUTES, { useHash: true })],
  declarations: [ElasticsearchReindexComponent, ElasticsearchReindexModalComponent],
  entryComponents: [ElasticsearchReindexModalComponent],
  providers: [ElasticsearchReindexService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TwentyOnePointsAppElasticsearchReindexModule {}
