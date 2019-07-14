import * as React from 'react';
import * as Firebase from 'firebase';
import { BartabelloEvent } from './../../lib/firebase';
import { EventCard } from './EventCard';

import { CSSTransitionGroup, TransitionGroup } from 'react-transition-group';

export interface EventsProps {
    did: string;
}

interface EventData {
    key: string;
    event: BartabelloEvent;
}

export interface EventsState {
    events: EventData[];
    expandedEvent: string;
}

export class Events extends React.Component<EventsProps, EventsState> {
    constructor(props: EventsProps) {
        super(props);
        this.state = {
            events: [],
            expandedEvent: ''
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

    handleCardExpand = (eid: string): void => {
        const id = this.state.expandedEvent === eid ? '' : eid;
        this.setState({expandedEvent: id});
    }

    render() {
        let noEventsMention = null;
        if(!this.state.events.length) {
            noEventsMention = <p style={{padding: '8px'}}>No planned events</p>
        }
        return(
            <div>
                {noEventsMention}
                <CSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={1000}
                    onAnimationStart={() => console.log('appear')}
                >
                    {this.state.events.map((eventdata, i) => {
                        return (<div key={eventdata.key}>
                            <EventCard
                                did={this.props.did}
                                eid={eventdata.key}
                                event={eventdata.event}
                                handleCardExpand={this.handleCardExpand}
                                expanded={this.state.expandedEvent === eventdata.key}
                            />
                        </div>);
                    })}
                </CSSTransitionGroup>
            </div>
        );
    }
}