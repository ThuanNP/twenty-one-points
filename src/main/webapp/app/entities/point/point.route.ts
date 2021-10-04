import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Point } from 'app/shared/model/point.model';
import { PointService } from './point.service';
import { PointComponent } from './point.component';
import { PointDetailComponent } from './point-detail.component';
import { PointUpdateComponent } from './point-update.component';
import { IPoint } from 'app/shared/model/point.model';

@Injectable({ providedIn: 'root' })
export class PointResolve implements Resolve<IPoint> {
  constructor(private service: PointService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPoint> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((point: HttpResponse<Point>) => point.body));
    }
    return of(new Point());
  }
}

export const pointRoute: Routes = [
  {
    path: '',
    component: PointComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'twentyOnePointsApp.point.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PointDetailComponent,
    resolve: {
      point: PointResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'twentyOnePointsApp.point.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PointUpdateComponent,
    resolve: {
      point: PointResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'twentyOnePointsApp.point.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PointUpdateComponent,
    resolve: {
      point: PointResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'twentyOnePointsApp.point.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
