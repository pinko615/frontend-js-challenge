import { createAction, props } from '@ngrx/store';

import { Trend } from '../../models/trend.model';
import { CreateTrendRequest } from 'src/app/interfaces/create-trend.interface';
import { UpdateTrendRequest } from 'src/app/interfaces/update-trend.interface';

export const loadOneTrend = createAction(
  '[Trends API] Load One Trend',
  props<{ id: string }>()
);

export const loadTrendsSuccess = createAction(
  '[Trends/API] Load Trends Success',
  props<{ trends: Trend[] }>()
);

export const loadTrendsError = createAction('[Trends/API] Load Trends Error');

export const loadOneTrendSuccess = createAction(
  '[Trends/API] Load One Trend Success',
  props<{ trend: Trend }>()
);

export const loadOneTrendError = createAction(
  '[Trends/API] Load One Trend Error'
);

export const deleteTrend = createAction(
  '[Trends List Page] Delete Trend',
  props<{ id: string }>()
);

export const deleteTrendSuccess = createAction(
  '[Trends API] Delete Trend Success',
  props<{ id: string }>()
);

export const deleteTrendError = createAction(
  '[Trends API] Delete Trend Error',
  props<{ id: string }>()
);

export const createTrend = createAction(
  '[Trends API] Create Trend',
  props<{ createRequest: CreateTrendRequest }>()
);

export const createTrendSuccess = createAction(
  '[Trends API] Create Trend Success',
  props<{ trend: Trend }>()
);

export const createTrendError = createAction(
  '[Trends API] Create Trend Error',
  props<{ error: any }>()
);

export const updateTrend = createAction(
  '[Trends API] Update Trend',
  props<{ id: string, updateRequest: UpdateTrendRequest }>()
);

export const updateTrendSuccess = createAction(
  '[Trends API] Update Trend Success',
  props<{ trend: Trend }>()
);

export const updateTrendError = createAction(
  '[Trends API] Update Trend Error',
  props<{ error: any }>()
);