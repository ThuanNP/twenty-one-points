import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'point',
        loadChildren: () => import('./point/point.module').then(m => m.TwentyOnePointsPointModule)
      },
      {
        path: 'weight',
        loadChildren: () => import('./weight/weight.module').then(m => m.TwentyOnePointsWeightModule)
      },
      {
        path: 'blood-pressure',
        loadChildren: () => import('./blood-pressure/blood-pressure.module').then(m => m.TwentyOnePointsBloodPressureModule)
      },
      {
        path: 'preferences',
        loadChildren: () => import('./preferences/preferences.module').then(m => m.TwentyOnePointsPreferencesModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class TwentyOnePointsEntityModule {}
