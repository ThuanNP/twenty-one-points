import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Weight } from 'app/shared/model/weight.model';
import { WeightService } from './weight.service';
import { WeightComponent } from './weight.component';
import { WeightDetailComponent } from './weight-detail.component';
import { WeightUpdateComponent } from './weight-update.component';
import { IWeight } from 'app/shared/model/weight.model';

@Injectable({ providedIn: 'root' })
export class WeightResolve implements Resolve<IWeight> {
  constructor(private service: WeightService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWeight> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((weight: HttpResponse<Weight>) => weight.body));
    }
    return of(new Weight());
  }
}

export const weightRoute: Routes = [
  {
    path: '',
    component: WeightComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'twentyOnePointsApp.weight.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: WeightDetailComponent,
    resolve: {
      weight: WeightResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'twentyOnePointsApp.weight.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: WeightUpdateComponent,
    resolve: {
      weight: WeightResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'twentyOnePointsApp.weight.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: WeightUpdateComponent,
    resolve: {
      weight: WeightResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'twentyOnePointsApp.weight.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
