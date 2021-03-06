import {Component} from '@angular/core';
import {ConfigService} from '../services/config.service';
import {Router} from '@angular/router';

@Component({
	moduleId: __filename,
	selector: 'footer',
	templateUrl: 'footer.template.html'
})
export class FooterComponent {
	public country: string;
	public version: string;
	public contactmail: string = 'digiwhist@okfn.de';

	constructor(public router: Router, private config: ConfigService) {
		this.country = config.country.name;
		this.version = config.config.version;
	}
}
