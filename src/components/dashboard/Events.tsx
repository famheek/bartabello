import * as React from 'react';
import * as Firebase from 'firebase';
import * as Moment from 'moment';
import { BartabelloEvent, deleteEvent } from './../../lib/firebase';

import { ImportantText } from './ImportantText';

interface TimeMapping {
    [i: string]: number;
}

const times: TimeMapping = {
    '30m': 30*60*1000,
    '1h': 1*60*60*1000,
    '2h': 2*60*60*1000,
    '4h': 4*60*60*1000,
    '8h': 8*60*60*1000
}

export interface EventsProps {
    did: string;
    time: Date;
}

interface EventData {
    key: string;
    event: BartabelloEvent;
}

export interface EventsState {
    events: EventData[];
}

export class Events extends React.Component<EventsProps, EventsState> {
    constructor(props: EventsProps) {
        super(props);
        this.state = {
            events: []
        }
    }
    componentWillMount() {
        var ref = Firebase.database().ref('dashboards/' + this.props.did + '/events');
        ref.on('child_added', (s) => {
            const newEventData = {
                key: s.key,
                event: s.val() 
            }
            console.log(newEventData);
            this.setState({events: [...this.state.events, newEventData]});
        });
        ref.on('child_removed', (s) => {
            const newEventsList = this.state.events.filter((e) => e.key !== s.key);
            this.setState({events: newEventsList});
        });
        ref.on('child_changed', (s) => {
            const newEventData = {
                key: s.key,
                event: s.val() 
            }
            const newEventsList = this.state.events.map((e) => e.key === s.key ? newEventData : e);
            this.setState({events: newEventsList});
        });
    }

    validateEvent = (event: EventData) => {
        const e = event.event;
        if(Moment().format('DD-MM-YYYY') !== e.date) return;
        const dms = Moment(e.time, 'HH:mm').valueOf() - Moment().valueOf();
        console.log(dms);
        console.log(times[e.timeInAdvance]);
        if(dms > 0 && dms < times[e.timeInAdvance]) {
            console.log('in time');
            return true
        }
        console.log('not in time');
        return false;
    }

    updateEvents = () => {
        this.state.events.map((event) => {
            const e = event.event;
            const dms = Moment(e.date + e.time, 'DD-MM-YYYYHH:mm').valueOf() - Moment().valueOf();
            if(dms < 0) {
                if(e.repeat === 'never') {
                    deleteEvent(this.props.did, event.key);
                }
            }
        });
    }

    render() {
        this.updateEvents();
        return(
            <>
                {this.state.events.filter((e) => this.validateEvent(e)).map((e) => {
                    return <div key={e.key}>
                        <ImportantText text={e.event.text}/>
                    </div>;
                })}
            </>
        );
    }
}