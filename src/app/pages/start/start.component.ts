import {Component} from '@angular/core';
import {ConfigService, Country} from '../../services/config.service';
import {ApiService} from '../../services/api.service';
import {IStatsCountry} from '../../app.interfaces';
import {NotifyService} from '../../services/notify.service';

@Component({
	moduleId: __filename,
	selector: 'start',
	templateUrl: 'start.template.html'
})
export class StartPage {
	public ip_country: Country;
	public portals: Array<IStatsCountry> = [];
	private allportal: IStatsCountry;
	private current: Country;
	private loading: number = 0;

	constructor(private api: ApiService, private config: ConfigService, private notify: NotifyService) {
		this.ip_country = config.country.ip;
		this.current = this.config.country;
		this.loading++;
		this.api.getPortalsStats().subscribe(
			(result) => {
				this.display(result.data);
			},
			(error) => {
				this.notify.error(error);
			},
			() => {
				this.loading--;
			});
	}

	display(data: Array<IStatsCountry>): void {
		if (!data) {
			return;
		}
		this.portals = [];
		data.forEach(p => {
			if (p.id !== 'eu') {
				this.portals.push(p);
			} else {
				this.allportal = p;
			}
		});
	}

}
