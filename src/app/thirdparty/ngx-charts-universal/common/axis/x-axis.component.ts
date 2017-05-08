import {
	Component,
	Input,
	SimpleChanges,
	Output,
	EventEmitter,
	OnChanges,
	ViewChild,
	ChangeDetectionStrategy
} from '@angular/core';

import {XAxisTicksComponent} from './x-axis-ticks.component';

@Component({
	selector: 'g[ngx-charts-x-axis]',
	template: `
    <svg:g
      [attr.class]="xAxisClassName"
      [attr.transform]="transform">
      <svg:g ngx-charts-x-axis-ticks
        [tickFormatting]="tickFormatting"
        [tickArguments]="tickArguments"
        [tickStroke]="tickStroke"
        [scale]="xScale"
        [orient]="xOrient"
        [showGridLines]="showGridLines"
        [gridLineHeight]="dims.height"
        [width]="dims.width"
        [defaultHeight]="defaultHeight"
        (dimensionsChanged)="emitTicksHeight($event)"
      />
      <svg:g ngx-charts-axis-label
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="labelOffset"
        [orient]="'bottom'"
        [height]="dims.height"
        [width]="dims.width">
      </svg:g>
    </svg:g>
  `,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAxisComponent implements OnChanges {

	@Input() dims = {width: 0, height: 0};
	@Input() xScale;
	@Input() defaultHeight: number;
	@Input() tickFormatting;
	@Input() showGridLines = false;
	@Input() showLabel;
	@Input() labelText;
	@Input() xAxisTickInterval;

	@Output() dimensionsChanged = new EventEmitter();

	xAxisTickCount: any;
	xAxisClassName: string = 'x axis';
	xOrient: string = 'bottom';
	tickArguments: any;
	transform: any;
	labelOffset: number = 80;
	fill: string = 'none';
	stroke: string = 'stroke';
	tickStroke: string = '#ccc';
	strokeWidth: string = 'none';
	xAxisOffset: number = 5;

	@ViewChild(XAxisTicksComponent) ticksComponent: XAxisTicksComponent;

	ngOnChanges(changes: SimpleChanges): void {
		this.update();
	}

	update(): void {
		this.transform = `translate(0,${this.xAxisOffset + this.dims.height})`;
		if (typeof this.xAxisTickCount !== 'undefined') {
			this.tickArguments = [this.xAxisTickCount];
		}
	}

	emitTicksHeight({height}): void {
		let newLabelOffset = height + 25 + 5;
		if (newLabelOffset !== this.labelOffset) {
			setTimeout(() => {
				this.dimensionsChanged.emit({height: height});
			}, 0);
		}
	}

}
