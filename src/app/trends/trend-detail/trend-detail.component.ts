import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectSelectedTrend } from '../store/selectors';
import { Router } from '@angular/router';
import * as TrendsApiActions from '../store/actions/trends-api.actions';
import { loadTrends } from '../store/actions/trends-list-page.actions';

@Component({
  selector: 'app-trend-detail',
  template: `
    <a class="link-to-home" routerLink="/trends">
      <img src="assets/Iconos/Actions/back.svg" alt="Flecha hacia atrás" />
      <span>TODOS LOS EVENTOS</span>
    </a>
    <article class="trend__detail" *ngIf="trend$ | async as trend">
      <header class="trend__header">
        <div class="trend__actions">
          <button type="button" class="trend__action" (click)="editTrend(trend.id)">
            <img src="assets/Iconos/Actions/edit.svg" alt="Editar noticia" />
          </button>
          <button type="button" class="trend__action" (click)="deleteTrend(trend.id)">
            <img src="assets/Iconos/Actions/delete.svg" alt="Borrar noticia" />
          </button>
        </div>
        <img class="trend__image" [src]="trend.image" alt="trend.title" />
      </header>
      <div class="trend__content">
        <h2 class="trend__title">
          <a class="trend__link" [href]="trend.url" target="_blank">
            {{ trend.title }}
          </a>
        </h2>
        <div class="trend_paragraph-container">
          <p class="trend__paragraph" *ngFor="let paragraph of trend.body">
            {{ paragraph }}
          </p>
        </div>
      </div>
      <app-modal *ngIf="showModal" [trend]="isEdition ? trend : null" [id]="trendId" [isEdition]="isEdition" (closeModal)="showModal = false"></app-modal>
      <app-add-button *ngIf="!showModal" (addTrend)="addTrend()"></app-add-button>
    </article>
  `,
  styleUrls: ['./trend-detail.component.scss'],
})
export class TrendDetailComponent {
  protected trend$ = this.store.select(selectSelectedTrend);
  public showModal: boolean = false;
  public isEdition: boolean = false;
  public trendId: string = ''
  constructor(private store: Store, private router: Router) { }

  public editTrend(id: string): void {
    this.trendId = id;
    this.isEdition = true;
    this.showModal = !this.showModal;
  }

  public addTrend(): void {
    this.isEdition = false;
    this.showModal = !this.showModal;
  }

  public deleteTrend(id: string): void {
    this.store.dispatch(TrendsApiActions.deleteTrend({ id }))
    this.router.navigate(['/trends']);
  }
}
