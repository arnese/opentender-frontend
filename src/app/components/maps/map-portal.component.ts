import {Component, Directive, QueryList, ElementRef, Input, ViewChildren, AfterViewInit, OnChanges, SimpleChanges, Renderer2} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {IStatsCountry} from '../../app.interfaces';
import {ConfigService, Country} from '../../services/config.service';
import {NotifyService} from '../../services/notify.service';
import {Router} from '@angular/router';

@Directive({selector: 'g.country'})
export class SVGCountryGroupDirective {
	@Input() id: string;
	portal: IStatsCountry;
	current: boolean;

	constructor(private el: ElementRef, private config: ConfigService, private renderer: Renderer2, private router: Router) {
		renderer.listen(el.nativeElement, 'click', (event) => {
			if (this.portal) {
				if (this.portal.id === this.config.country.id) {
					router.navigate(['/']);
				} else {
					window.location.href = '/' + (this.portal.id || '');
				}
			}
		});
	}

	public setData(portal: IStatsCountry, isCurrent: boolean) {
		this.portal = portal;
		this.current = isCurrent;
		if (this.current) {
			this.renderer.addClass(this.el.nativeElement, 'current');
		} else if (portal.value > 0) {
			this.renderer.addClass(this.el.nativeElement, 'active');
		}
	}
}

@Component({
	selector: 'portal-map',
	templateUrl: 'map-portal.template.html'
})
export class MapPortalComponent implements AfterViewInit, OnChanges {

	@Input()
	portals: Array<IStatsCountry>;

	@ViewChildren(SVGCountryGroupDirective)
	items: QueryList<SVGCountryGroupDirective>;

	public svg: Array<{ id: string; p: Array<string>; c?: Array<{ cx: number; cy: number; r: number }> }>;
	public current: Country;
	public loading: number = 0;

	constructor(private api: ApiService, private config: ConfigService, private notify: NotifyService) {
		this.current = config.country;
	}

	public ngAfterViewInit(): void {
		setTimeout(() => {
			this.load();
		}, 0);
	}

	public ngOnChanges(changes: SimpleChanges): void {
		this.apply();
	}

	private load() {
		this.loading++;
		this.api.getPortalMapData().subscribe(
			(result) => {
				this.display(result);
			},
			error => {
				this.notify.error(error);
			},
			() => {
				this.loading--;
			}
		);
	}

	private display(svg) {
		this.svg = svg;
		setTimeout(() => {
			this.apply();
		}, 0);
	}

	private apply() {
		if (this.portals && this.items && this.svg) {
			this.items.forEach((item) => {
				let portal = this.portals.filter(p => p.id == item.id)[0];
				if (portal) {
					item.setData(portal, item.id === this.current.id);
				}
			});
		}
	}

}
