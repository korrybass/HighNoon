import React from 'react';
import {timeDivMap } from './timeMap';
export default class Week extends React.Component {

    constructor() {
        super();
        this.state = {
            viewHeight: "400px",
            newEvent: null,
            eventDataSource: [],
            newEvents: []
        };
    }

    componentDidMount (){
        window.addEventListener("resize", function () {
            console.log('resizing', this);
        }.bind(this));
    }
    buildWeeklyTimes (){
        return timeDivMap.map((x, idx) => {
            return <div className="rc-weekly-times" key={idx}><p className="rc-hourly-time"> {x}</p></div>;
        });
    }

    findEventPosition (hour){
        
        return hourIndex * 21;
    }
    buildWeeklySlots (){
        let timeDivs = [];
        for (let i = 1; i <= 24; i++){
            timeDivs.push(<div key={i} className="rc-markercell">
                <div className="rc-dualmarker"></div>
            </div>);
        }
        return timeDivs;
    }
    buildWeeklyDayCols (){
        let timeDivs = [];
        for (let i = 1; i <= 7; i++){
            timeDivs.push(<td key={i} className="rc-weekly-day-col">
                <div  ref={"day-column"+i} onClick={(e) => { this.onDayColClick(e, i)}} className="rc-col-eventwrapper" style={{height: "1008px", marginBottom: "-1008px"}}>
                    <div>
                        Test time
                    </div>
                </div>
            </td>);
        }
        return timeDivs;
    }
    onDayColClick (e, ref){

        console.log(ref, this.refs);
        let eventPosY = e.clientY - e.target.offsetTop + this.refs['weeklyWrapper'].scrollTop;
        let elem = this.refs[ref];
        let nearestMultiple = Math.round(eventPosY / 21) * 21;
        let events = [...this.state.newEvents, {start: null, position: nearestMultiple}];
        this.setState({newEvents: events});
    }
    
    render() {
        let viewHeight = { height: "400px" };
        return (
            <div className="rc-weekly-wrapper">
                <div>
                    <table className="rc-weekly-day-table">
                        <tbody>
                            <tr>
                                <td style={{width: "60px"}}>&nbsp;</td>
                                <td className="rc-day-col">Sun</td>
                                <td className="rc-day-col">Mon</td>
                                <td className="rc-day-col">Tues</td>
                                <td className="rc-day-col">Wed</td>
                                <td className="rc-day-col">Thur</td>
                                <td className="rc-day-col">Fri</td>
                                <td className="rc-day-col">Sat</td>
                                <td style={{width: "10px"}}>&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={viewHeight} ref="weeklyWrapper" className="rc-weekly-table-wrapper">
                    <table  className="rc-weekly-table">
                        <tbody>
                        <tr height="1">
                            <td style={ {width: '60px'}}></td>
                            <td colSpan="7">
                                <div className="rc-hours-wrapper">
                                    <div className="rc-weekly-hoursmarker">
                                        {this.buildWeeklySlots().map(function (x) {
                                            return x;
                                        })}
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{width: "60px"}}>
                                {this.buildWeeklyTimes().map(function (x) { return x; })}
                            </td>
                            {this.buildWeeklyDayCols().map(function (x) { return x; })}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}