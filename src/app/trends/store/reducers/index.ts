import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as TrendsApiActions from '../actions/trends-api.actions';
import { Trend } from '../../models/trend.model';

export const trendsFeatureKey = 'trends';

export interface State extends EntityState<Trend> {
  selectedTrend: Trend | null;
}

export const adapter: EntityAdapter<Trend> = createEntityAdapter<Trend>();

export const initialState: State = adapter.getInitialState({
  selectedTrend: null,
  trends: [],
  loading: false,
  error: null
});

export const trendsReducer = createReducer(
  initialState,
  on(TrendsApiActions.loadTrendsSuccess, (state, { trends }) => {
    return adapter.setAll(trends, state);
  }),
  on(TrendsApiActions.loadTrendsError, (state) => {
    return adapter.removeAll(state);
  }),
  on(
    TrendsApiActions.loadOneTrendSuccess,
    (state, { trend: selectedTrend }): State => {
      return { ...state, selectedTrend };
    }
  ),
  on(TrendsApiActions.loadOneTrendError, (state): State => {
    return { ...state, selectedTrend: null };
  }),
  on(TrendsApiActions.createTrend, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TrendsApiActions.createTrendSuccess, (state, { trend }) => {
    return adapter.addOne(trend, { ...state, loading: false });
  }),
  on(TrendsApiActions.createTrendError, (state, { error }) => ({
    ...state,
    loading: false,
    error: error.message
  })),
  on(TrendsApiActions.updateTrend, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TrendsApiActions.updateTrendSuccess, (state, { trend }) => {
    return adapter.updateOne(
      { id: trend.id, changes: trend },
      { ...state, loading: false }
    );
  }),
  on(TrendsApiActions.updateTrendError, (state, { error }) => ({
    ...state,
    loading: false,
    error: error.message
  }))
);

export const selectSelectedTrend = (state: State) => state.selectedTrend;

const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

// select the array of trend ids
export const selectTrendIds = selectIds;

// select the dictionary of trend entities
export const selectTrendEntities = selectEntities;

// select the array of trends
export const selectAllTrends = selectAll;

// select the total trend count
export const selectTrendTotal = selectTotal;
