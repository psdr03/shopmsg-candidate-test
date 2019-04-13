import * as React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


am4core.useTheme(am4themes_animated);


class Charts extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = {
            showOptins: true,
            showRecipients: true,
            optins: this.props.optins,
            recipients: this.props.recips
        }
    }

    createChart = (...theArgs) => {
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.title.text = "Date";
        dateAxis.cursorTooltipEnabled = false;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Count";
        valueAxis.cursorTooltipEnabled = false;

        for (let x in theArgs) {
            let series = chart.series.push(new am4charts.LineSeries());
            series.name = theArgs[x][1];
            series.data = theArgs[x][0];
            series.strokeWidth = 3;
            series.dataFields.valueY = "count";
            series.dataFields.dateX = "date";
            let circleBullet = series.bullets.push(new am4charts.CircleBullet());
            circleBullet.circle.stroke = am4core.color("#fff");
            circleBullet.circle.strokeWidth = 2;
            series.tooltipText = "{valueY.value}";
        }

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineX.disabled = true;
        chart.cursor.lineY.disabled = true;
        chart.svgContainer.htmlElement.style.height = 500 + "px";
        chart.legend = new am4charts.Legend();
    }

    componentDidUpdate = () => {
        if (this.state.optins !== this.props.optins || this.state.recipients !== this.props.recips) {
            this.setState({
                optins: this.props.optins,
                recipients: this.props.recips
            })
        }
        if (this.props.showOptins && this.props.showRecipients) {
            this.createChart([this.state.optins,"Optins"], [this.state.recipients, "Recipients"]);
        } else if (this.props.showOptins && !this.props.showRecipients) {
            this.createChart([this.state.optins,"Optins"])
        } else if (!this.props.showOptins && this.props.showRecipients) {
            this.createChart([this.state.recipients, "Recipients"]);
        }
    }

    public render() {
        return (
            <div id="chartdiv"></div>
        )
    }
}

export default Charts;