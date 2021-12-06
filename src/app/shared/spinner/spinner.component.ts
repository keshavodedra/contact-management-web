import { Component, Input } from '@angular/core';

@Component({
  selector: 'spinner',
  styleUrls: ['./spinnerComponent.scss'],
  template: `
    <div class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden"></span>
      </div>
    </div>
  `,
})
export class SpinnerComponent {
  @Input() visible = true;
}
