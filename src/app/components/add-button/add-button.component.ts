import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  template: `
    <button class="new__btn" (click)="handleClick()">
      <svg width="33px" height="33px" viewBox="0 0 33 33" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <path d="M8.08595426,5.40554446 L16.488,13.807 L24.890681,5.40554446 C25.431407,4.86481851 26.3080969,4.86481851 26.8488229,5.40554446 L27.5710908,6.1278124 C28.1118168,6.66853835 28.1118168,7.54522832 27.5710908,8.08595426 L19.168,16.488 L27.5710908,24.890681 C28.1118168,25.431407 28.1118168,26.3080969 27.5710908,26.8488229 L26.8488229,27.5710908 C26.3080969,28.1118168 25.431407,28.1118168 24.890681,27.5710908 L16.488,19.168 L8.08595426,27.5710908 C7.54522832,28.1118168 6.66853835,28.1118168 6.1278124,27.5710908 L5.40554446,26.8488229 C4.86481851,26.3080969 4.86481851,25.431407 5.40554446,24.890681 L13.807,16.488 L5.40554446,8.08595426 C4.86481851,7.54522832 4.86481851,6.66853835 5.40554446,6.1278124 L6.1278124,5.40554446 C6.66853835,4.86481851 7.54522832,4.86481851 8.08595426,5.40554446 Z" id="path-1"></path>
        </defs>
        <g id="Artboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <mask id="mask-2" fill="white">
            <use xlink:href="#path-1"></use>
          </mask>
          <use id="Combined-Shape" fill="#ffffff" fill-rule="nonzero" transform="translate(16.488318, 16.488318) rotate(-315.000000) translate(-16.488318, -16.488318) " xlink:href="#path-1"></use>
        </g>
      </svg>
    </button>
  `,
  styles: [
    `
      .new__btn {
        position: absolute;
        z-index: 9999;
        top: 50%;
        right: 24px;
        background: #F15F41;
        border: none;
        border-radius: 50%;
        height: 72px;
        width: 72px;
        box-shadow: 0px 6px 20px 0px #F15F4199;
        cursor: pointer;
      }
    `
  ]
})
export class AddButtonComponent implements OnInit {
  @Output() addTrend: EventEmitter<boolean> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  handleClick(): void {
    this.addTrend.emit(true);
  }

}
