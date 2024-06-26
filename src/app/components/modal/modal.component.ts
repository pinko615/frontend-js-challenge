import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormField } from '../../interfaces/form-field.interface';
import * as TrendsApiActions from '../../trends/store/actions/trends-api.actions';
import { TREND_FORM_FIELDS } from '../../constants/trend-form';
import { Router } from '@angular/router';
import { loadTrends } from 'src/app/trends/store/actions/trends-list-page.actions';
import { selectSelectedTrend } from 'src/app/trends/store/selectors';
import { Trend } from 'src/app/trends/models/trend.model';

@Component({
  selector: 'app-modal',
  template: `
    <div class="modal__background">
      <div class="modal__content">
        <div class="modal__header">
          <p class="modal__title">{{ isEdition ? 'Edita la' : 'Nueva' }} noticia</p>
          <div class="modal__actions">
            <button class="cancel__btn" (click)="onCloseModal()">Cancelar</button>
            <button class="save__btn" [disabled]="!form.valid" (click)="isEdition ? editTrend() : createTrend() ">Guardar</button>
          </div>
        </div>
        <form [formGroup]="form" class="modal__form">
          <div class="form__group" *ngFor="let field of trendFormFields">
            <label>{{ field.label }}</label>
            <ng-container [ngSwitch]="field.type">
              <input *ngSwitchCase="'text'" type="text" [placeholder]="field.placeholder" [formControlName]="field.name" />
              <textarea *ngSwitchCase="'textarea'" [placeholder]="field.placeholder" [formControlName]="field.name"></textarea>
            </ng-container>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
    .modal__background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #0000004D;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .modal__content {
      background-color: #ffffff;
      height: 100%;
      width: 491px;
      position: fixed;
      right: 0;
      top: 0;
      border-top-left-radius: 33px;
      box-shadow: -1px 1px 20px 0px #0000001F;
      padding: 70px 40px 48px 40px;
      display: flex;
      flex-direction: column;
      gap: 72px;
      overflow: scroll;
    }

    .modal__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal__title {
      margin: 0;
      color: #404040;
      font-size: 18px;
      line-height: 21.94px;
      font-weight: 600;
    }

    .modal__actions {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    button {
      font-weight: 500;
      font-size: 14px;
      line-height: 17.07px;
      cursor: pointer;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .cancel__btn {
      background: none;
      border: none;
      color: #939393;
    }

    .save__btn {
      background: #F15F41;
      color: #ffffff;
      border: none;
      padding: 10px 26px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 40px;
    }

    .form__group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    label {
      color: #505050;
      font-weight: 600;
      font-size: 12px;
      line-height: 14.63px;
    }

    input, textarea {
      border: 1px solid #D8D8D8;
      border-radius: 4px;
      padding: 16px 20px;
      font-size: 16px;
    }

    input {
      height: 56px;
    }

    textarea {
      height: 479px;
    }

    ::placeholder {
      color: #D8D8D8;
    }

    `
  ]
})
export class ModalComponent implements OnInit {
  @Input() trend: Trend | null = {} as Trend;
  @Input() id: string = '';
  @Input() isEdition: boolean = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  form: FormGroup = new FormGroup({
    url: new FormControl('', [Validators.required]),
    provider: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  })

  trendFormFields: FormField[] = TREND_FORM_FIELDS;
  protected trend$ = this.store.select(selectSelectedTrend);
  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    if (!this.trend) return;
    const trend = { ...this.trend, body: this.trend.body?.join('\n\n') };
    this.form.patchValue(trend);
    this.isEdition = true;
  }

  onCloseModal(): void {
    this.isEdition = false;
    this.closeModal.emit(true);
  }

  editTrend(): void {
    this.store.dispatch(TrendsApiActions.updateTrend({ id: this.id, updateRequest: this.form.value }));
    this.store.dispatch(TrendsApiActions.loadOneTrend({ id: this.id }));
    this.onCloseModal()
  }

  createTrend(): void {
    this.store.dispatch(TrendsApiActions.createTrend({ createRequest: this.form.value }));
    this.onCloseModal()
    this.router.navigate(['/trends']);
    this.store.dispatch(loadTrends());
  }

}
