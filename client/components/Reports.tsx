import * as React from 'react';
import { DatePicker, Switch} from 'antd';
import axios from 'axios';
import moment from 'moment';
import Charts from './Charts'

// set default values for calendar
let yesterday = moment().subtract(1, 'days'),
    weekBefore = moment().subtract(7, 'days')

export default class Reports extends React.Component {
    state = {
        startValue: weekBefore,
        endValue: yesterday,
        endOpen: false,
        optinsRes: [],
        recipsRes: [], 
        showOptins: true,
        showRecipients: true,
        shouldUpdate: false,
    };

    getData = (start, end) => {
        axios.all([
            axios.get(`https://shopmsg-chart-demo.herokuapp.com/api/reports/optins.json?from=${start.format('YYYY-MM-DD')}&to=${end.format('YYYY-MM-DD')}`),
            axios.get(`https://shopmsg-chart-demo.herokuapp.com/api/reports/recipients.json?from=${start.format('YYYY-MM-DD')}&to=${end.format('YYYY-MM-DD')}`),
        ])
        .then(axios.spread((optins, recips) => {
            let optinsRes = optins.data,
                recipsRes = recips.data
            this.setState({
                optinsRes,
                recipsRes,
                shouldUpdate: false
            })
        }))
    }

    componentDidMount = () => {
        this.getData(weekBefore, yesterday)
    }

    componentDidUpdate = () => {
        if (this.state.shouldUpdate) {
            this.getData(this.state.startValue, this.state.endValue)
            this.setState({shouldUpdate: false})
        }
    }

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
          return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
          return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }
    
    onChange = (field, value) => {
        this.setState({
          [field]: value,
          shouldUpdate: true
        });
    }
    
    onStartChange = (value) => {
        this.onChange('startValue', value);
    }
    
    onEndChange = (value) => {
        this.onChange('endValue', value);
    }
    
    handleStartOpenChange = (open) => {
        if (!open) {
          this.setState({ endOpen: true });
        }
    }
    
    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }

    onSwitchOptins = (checked) => {
        let showOptins = !this.state.showOptins;
        this.setState({
            showOptins
        })
    }

    onSwitchRecipients = (checked) => {
        let showRecipients = !this.state.showRecipients;
        this.setState({
            showRecipients
        })
    }

    render() {
        return (
            <>
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <div style={{
                    marginLeft: "75px",
                    flex: "1",
                    alignSelf: "center"
                }}>
                    <span>Optins: </span> <Switch defaultChecked onChange={this.onSwitchOptins} /><span style={{marginRight: "15px"}}></span>
                    <span>Recipients: </span><Switch defaultChecked onChange={this.onSwitchRecipients}/>
                </div>
                <div style= {{
                    flex: "1",
                    textAlign: "right"
                }}>
                    <DatePicker
                        disabledDate={this.disabledStartDate}
                        format="YYYY-MM-DD"
                        placeholder="Start"
                        onChange={this.onStartChange}
                        onOpenChange={this.handleStartOpenChange}
                        value={this.state.startValue}
                        style={{
                            marginRight: "10px"
                        }}
                    />
                    <DatePicker
                        disabledDate={this.disabledEndDate}
                        format="YYYY-MM-DD"
                        placeholder="End"
                        onChange={this.onEndChange}
                        onOpenChange={this.handleEndOpenChange}
                        value={this.state.endValue}
                        style={{
                            marginRight: "15px"
                        }}
                    />
                </div>
                </div>
                    <Charts 
                        optins={this.state.optinsRes}
                        recips={this.state.recipsRes}
                        showOptins={this.state.showOptins}
                        showRecipients={this.state.showRecipients}
                />
            </>
        
        )
    }
}