import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  inputText: string = '';

  @Input() title: string = '';
  @Input() countResults: number = 0;
  @Output() titleBtn: string = 'Search';
  @Input() disableBtn: boolean | null = false;

  @Output() btnClick = new EventEmitter();
  @Output() changeInput = new EventEmitter();

  onClick(): void{
		this.btnClick.emit(this.inputText)
	}
  onInputChange(): void{
    this.changeInput.emit(this.inputText)
  }

  constructor() { }

}
