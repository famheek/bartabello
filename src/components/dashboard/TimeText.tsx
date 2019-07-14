import * as React from 'react';
import * as Moment from 'moment';

import { ImportantText } from './ImportantText';

interface DayMapping {
    [i: number]: string;
}

const dayparts: DayMapping = {
    6: 'ochtend',
    12: 'middag',
    18: 'avond',
    23: 'nacht'
}

export interface TimeTextProps {
    time: Date;
}

export class TimeText extends React.Component<TimeTextProps, {}> {
    constructor(props: TimeTextProps) {
        super(props);
    }
    getTimeText = (date: Date): string => {
        let minsText, directionText, hoursText;
        let mins = Math.round(date.getMinutes() / 5) * 5;
        let hours = date.getHours() % 12;
        let direction = mins < 30;
        mins = direction ? mins : 60 - mins;
        let isHalf = mins > 15;
        if(isHalf) {
            hours++;
            mins -= 30;
            direction = !direction;
        } else if(!direction) {
            hours++;
        }
        if(hours === 0) {
            hours = 12;
        }
        minsText = Math.abs(mins).toString();
        hoursText = hours.toString();
        if(mins === 15) {
            minsText = 'kwart';
        }
        directionText = direction ? 'over' : 'voor';
        if(mins === 0 && !isHalf) {
            hoursText = hours.toString() + ' uur';
        } else if(isHalf) {
            hoursText = 'half ' + hours.toString();
        }
        if(mins === 0) {
            minsText = '';
            directionText = '';
        }
        return [minsText, directionText, hoursText].join(' ');
    }
    getDayPart = (hour: number): string => {
        if(dayparts[hour] === undefined) {
            return this.getDayPart((hour + 23) % 24);
        }
        return dayparts[hour];
    }
    render() {
        return(
            <div style={{margin: '32px'}}>
                <ImportantText text="het is nu"/>
                <ImportantText text={this.getTimeText(this.props.time).toUpperCase()}/>
                <ImportantText text="in de"/>
                <ImportantText text={this.getDayPart(this.props.time.getHours()).toUpperCase()}/>
            </div>
        );
    }
}