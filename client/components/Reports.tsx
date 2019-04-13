import * as React from 'react';
import { DatePicker, Switch } from 'antd';
import axios from 'axios';
import moment from 'moment';
import Charts from './Charts'


// set default values for calendar
let yesterday = moment().subtract(1, 'days'),
    weekBefore = moment().subtract(7, 'days')

export default class Reports extends React.Component {
    state = {
        isLoading: true,
        startValue: weekBefore,
        endValue: yesterday,
        endOpen: false,
        optinsRes: [],
        recipsRes: [], 
        oldStart: weekBefore,
        oldEnd: yesterday,
        showOptins: true,
        showRecipients: true
    };

    getData = (start, end) => {
        axios.all([
            axios.get(`https://shopmsg-chart-demo.herokuapp.com/api/reports/optins.json?from=${start.format('YYYY-MM-DD')}&to=${end.format('YYYY-MM-DD')}`),
            axios.get(`https://shopmsg-chart-demo.herokuapp.com/api/reports/recipients.json?from=${start}&to=${end}`),
        ])
        .then(axios.spread((optins, recips) => {
            let optinsRes = optins.data,
                recipsRes = recips.data
            this.setState({
                optinsRes,
                recipsRes,
                oldStart: start,
                oldEnd: end,
            })
        }))
    }



    componentDidMount = () => {
        this.getData(weekBefore, yesterday)
    }

    componentDidUpdate = () => {
        if (this.state.startValue !== this.state.oldStart || this.state.endValue !== this.state.oldEnd) {
            this.getData(this.state.startValue, this.state.endValue)
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
                    <span>Optins: </span><Switch defaultChecked onClick={this.onSwitchOptins} style={{ margin: '0 16px' }} />
                    <span>Recipients: </span><Switch defaultChecked onClick={this.onSwitchRecipients} style={{ margin: '0 16px' }}  />
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