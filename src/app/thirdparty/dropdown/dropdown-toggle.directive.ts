import {
	Directive, ElementRef, Host, HostBinding, HostListener, Input, OnInit
} from '@angular/core';

import {DropdownDirective} from './dropdown.directive';

@Directive({
	selector: '[dropdown-toggle]',
	exportAs: 'bs-dropdown-toggle'
})
export class DropdownToggleDirective implements OnInit {
	@HostBinding('class.disabled')
	@Input() public isDisabled: boolean = false;

	@HostBinding('class.dropdown-toggle')
	@Input() public addToggleClass: boolean = true;

	@HostBinding('attr.aria-haspopup')
	public addClass: boolean = true;

	public dropdown: DropdownDirective;
	public el: ElementRef;

	public constructor(@Host() dropdown: DropdownDirective, el: ElementRef) {
		this.dropdown = dropdown;
		this.el = el;
	}

	public ngOnInit(): void {
		this.dropdown.dropDownToggle = this;
	}

	@HostBinding('attr.aria-expanded')
	public get isOpen(): boolean {
		return this.dropdown.isOpen;
	}

	@HostListener('click', ['$event'])
	public toggleDropdown(event: any): boolean {
		event.stopPropagation();

		if (!this.isDisabled) {
			this.dropdown.toggle();
		}
		return false;
	}
}
