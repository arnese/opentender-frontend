import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Utils} from '../../model/utils';
import {Consts} from '../../model/consts';
import {IChartBar} from '../../thirdparty/ngx-charts-universal/chart.interface';
import {ISeriesProvider, IStatsInYears} from '../../app.interfaces';
import {I18NService} from '../../services/i18n.service';

@Component({
	selector: 'graph[score-histogram]',
	template: `
		<div class="graph-title" i18n>Average Score of {{title}} over Time</div>
		<div class="graph-toolbar-container"></div>
		<ngx-charts-bar-vertical
				class="chart-container"
				[chart]="graph.chart"
				[data]="graph.data"
				(select)="graph.select($event)"
				(legendLabelClick)="graph.onLegendLabelClick($event)">
		</ngx-charts-bar-vertical>
		<select-series-download-button [sender]="this"></select-series-download-button>`
})
export class GraphIndicatorScoreHistogramComponent implements OnChanges, ISeriesProvider {
	@Input()
	data: IStatsInYears;
	@Input()
	title: string = '';

	avg_score_in_years: IChartBar = {
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
				defaultHeight: 20,
				tickFormatting: Utils.formatYear
			},
			yAxis: {
				show: true,
				showLabel: true,
				defaultWidth: 30,
				minInterval: 0.1,
				tickFormatting: Utils.formatValue
			},
			valueFormatting: Utils.formatValue,
			showGridLines: true,
			gradient: false,
			colorScheme: {
				domain: Consts.colors.single
			}
		},
		select: (event) => {
		},
		onLegendLabelClick: (event) => {
		},
		data: null
	};

	graph: IChartBar = this.avg_score_in_years;

	constructor(private i18n: I18NService) {
		let year = this.i18n.get('Year');
		this.avg_score_in_years.chart.xAxis.label = year;
		this.avg_score_in_years.chart.yAxis.label = this.i18n.get('Average Indicator Score');
	}

	getSeriesInfo() {
		return {data: this.graph.data, header: {value: this.graph.chart.yAxis.label + ' ' + this.title, name: 'Year'}, filename: 'histogram'};
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.avg_score_in_years.data = null;
		if (this.data) {
			this.avg_score_in_years.data = Object.keys(this.data).map((key) => {
				return {name: key, value: this.data[key]};
			});
		}
	}

}
