import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { routerNavigationAction } from '@ngrx/router-store';

import * as TrendsApiActions from '../actions/trends-api.actions';
import * as TrendsListPageActions from '../actions/trends-list-page.actions';
import { TrendService } from '../../trend.service';

@Injectable()
export class TrendsEffects {
  loadTrends$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsListPageActions.loadTrends),
      mergeMap(() =>
        this.trendService.getAll().pipe(
          map((trends) => TrendsApiActions.loadTrendsSuccess({ trends })),
          catchError(() => of(TrendsApiActions.loadTrendsError()))
        )
      )
    );
  });

  loadOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigationAction),
      filter(({ payload }) => /^\/trends\/[a-z0-9]+$/.test(payload.event.url)),
      map(({ payload }) => payload.routerState.root.firstChild?.params['id']),
      switchMap((id: string) =>
        this.trendService.getOne(id).pipe(
          map((trend) => TrendsApiActions.loadOneTrendSuccess({ trend })),
          catchError(() => of(TrendsApiActions.loadOneTrendError()))
        )
      )
    );
  });

  deleteTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsApiActions.deleteTrend),
      mergeMap(({ id }) =>
        this.trendService.delete(id).pipe(
          map(() => TrendsApiActions.deleteTrendSuccess({ id })),
          catchError(() => of(TrendsApiActions.deleteTrendError({ id })))
        )
      )
    );
  });

  createTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsApiActions.createTrend),
      mergeMap(({ createRequest }) =>
        this.trendService.create(createRequest).pipe(
          map((trend) => TrendsApiActions.createTrendSuccess({ trend })),
          catchError((error) => of(TrendsApiActions.createTrendError({ error })))
        )
      )
    );
  });

  updateTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsApiActions.updateTrend),
      mergeMap(({ id, updateRequest }) =>
        this.trendService.update(id, updateRequest).pipe(
          map((trend) => TrendsApiActions.updateTrendSuccess({ trend })),
          catchError((error) => of(TrendsApiActions.updateTrendError({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions, private trendService: TrendService) { }
}
