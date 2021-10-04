import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Preferences } from 'app/shared/model/preferences.model';
import { PreferencesService } from './preferences.service';
import { PreferencesComponent } from './preferences.component';
import { PreferencesDetailComponent } from './preferences-detail.component';
import { PreferencesUpdateComponent } from './preferences-update.component';
import { IPreferences } from 'app/shared/model/preferences.model';

@Injectable({ providedIn: 'root' })
export class PreferencesResolve implements Resolve<IPreferences> {
  constructor(private service: PreferencesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPreferences> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((preferences: HttpResponse<Preferences>) => preferences.body));
    }
    return of(new Preferences());
  }
}

export const preferencesRoute: Routes = [
  {
    path: '',
    component: PreferencesComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'twentyOnePointsApp.preferences.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PreferencesDetailComponent,
    resolve: {
      preferences: PreferencesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'twentyOnePointsApp.preferences.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PreferencesUpdateComponent,
    resolve: {
      preferences: PreferencesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'twentyOnePointsApp.preferences.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PreferencesUpdateComponent,
    resolve: {
      preferences: PreferencesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'twentyOnePointsApp.preferences.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
