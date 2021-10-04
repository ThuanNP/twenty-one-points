import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BloodPressure } from 'app/shared/model/blood-pressure.model';
import { BloodPressureService } from './blood-pressure.service';
import { BloodPressureComponent } from './blood-pressure.component';
import { BloodPressureDetailComponent } from './blood-pressure-detail.component';
import { BloodPressureUpdateComponent } from './blood-pressure-update.component';
import { IBloodPressure } from 'app/shared/model/blood-pressure.model';

@Injectable({ providedIn: 'root' })
export class BloodPressureResolve implements Resolve<IBloodPressure> {
  constructor(private service: BloodPressureService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBloodPressure> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((bloodPressure: HttpResponse<BloodPressure>) => bloodPressure.body));
    }
    return of(new BloodPressure());
  }
}

export const bloodPressureRoute: Routes = [
  {
    path: '',
    component: BloodPressureComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'twentyOnePointsApp.bloodPressure.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BloodPressureDetailComponent,
    resolve: {
      bloodPressure: BloodPressureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'twentyOnePointsApp.bloodPressure.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BloodPressureUpdateComponent,
    resolve: {
      bloodPressure: BloodPressureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'twentyOnePointsApp.bloodPressure.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BloodPressureUpdateComponent,
    resolve: {
      bloodPressure: BloodPressureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'twentyOnePointsApp.bloodPressure.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
