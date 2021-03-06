import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Utils} from '../../model/utils';
import {Consts} from '../../model/consts';
import {IChartBar} from '../../thirdparty/ngx-charts-universal/chart.interface';
import {ISeriesProvider, IStatsCpvs} from '../../app.interfaces';
import {Router} from '@angular/router';
import {I18NService} from '../../services/i18n.service';

@Component({
	selector: 'graph[score-sectors]',
	template: `
		<div class="graph-title" i18n>Average Score of {{title}} per Sector</div>
		<div class="graph-toolbar-container"></div>
		<ngx-charts-bar-horizontal-labeled
				class="chart-container"
				[chart]="graph.chart"
				[data]="graph.data"
				(select)="graph.select($event)"
				(legendLabelClick)="graph.onLegendLabelClick($event)">
		</ngx-charts-bar-horizontal-labeled>
		<select-series-download-button [sender]="this"></select-series-download-button>`
})
export class GraphScoreSectorsComponent implements OnChanges, ISeriesProvider {
	@Input()
	data: IStatsCpvs;
	@Input()
	title: string = '';

	cpvs_codes_scores: IChartBar = {
		chart: {
			schemeType: 'ordinal',
			view: {
				def: {width: 500, height: 360},
				min: {height: 360},
				max: {height: 360}
			},
			xAxis: {
				show: true,
				showLabel: true,
				minInterval: 0.1,
				defaultHeight: 20,
				tickFormatting: Utils.formatValue
			},
			yAxis: {
				show: false,
				showLabel: true,
				defaultWidth: 150,
				maxLength: 24,
			},
			valueFormatting: Utils.formatValue,
			showGridLines: true,
			gradient: false,
			colorScheme: {
				domain: Consts.colors.single2
			}
		},
		select: (event) => {
			if (event.id) {
				this.router.navigate(['/sector/' + event.id]);
			}
		},
		onLegendLabelClick: (event) => {
		},
		data: null
	};

	graph: IChartBar = this.cpvs_codes_scores;

	constructor(private router: Router, private i18n: I18NService) {
		this.title = this.i18n.get('Sectors');
		this.cpvs_codes_scores.chart.xAxis.label = this.i18n.get('Average Score');
		this.cpvs_codes_scores.chart.yAxis.label = this.i18n.get('Sector (CPV)');
	}

	getSeriesInfo() {
		let series = Object.keys(this.data).map((key) => {
			return {id: key, name: this.data[key].name, value: this.data[key].value};
		});
		return {data: series, header: {value: this.graph.chart.xAxis.label, name: 'CPV Name', id: 'CPV Nr.'}, filename: 'sectors'};
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.cpvs_codes_scores.data = [];
		if (this.data) {
			this.cpvs_codes_scores.data = Object.keys(this.data).map((key) => {
				return {id: key, name: this.data[key].name, value: this.data[key].value};
			});
			this.cpvs_codes_scores.data.sort((a, b) => {
				if (a.value > b.value) {
					return 1;
				}
				if (a.value < b.value) {
					return -1;
				}
				return 0;
			});
			let othergroup;
			let othergroupcount = 0;
			while (this.cpvs_codes_scores.data.length - 8 > 2) {
				if (!othergroup) {
					othergroup = {name: '', value: 0};
				}
				let item = this.cpvs_codes_scores.data.shift();
				othergroup.value = Math.max(item.value, othergroup.value);
				othergroupcount++;
				othergroup.name = '(' + othergroupcount + ' other sectors with less than ' + Utils.roundValueTwoDecimals(item.value) + ')';
			}
			if (othergroup) {
				this.cpvs_codes_scores.data.unshift(othergroup);
			}
		}
	}

}
