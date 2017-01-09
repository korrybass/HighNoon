import React from 'react';
import CalWrapper from './CalenderViewWrapper';


export default class CalendarContainer extends React.Component {

    constructor() {
        super();

        this.state = {
            calView: "month"
        };
    }

    changeView (view){
        this.setState({calView: view});
    }

    render() {
        let options = {
            view: this.state.calView
        };
        return (
            <div>
                <CalWrapper viewAction={this.changeView.bind(this)} options={options} />
            </div>
        );
    }
}