import * as React from 'react';
import * as Moment from 'moment';
import { Card, TextField, CardHeader, RaisedButton, IconButton } from 'material-ui';
import DoneIcon from 'material-ui/svg-icons/action/done';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import { BartabelloEvent, updateEvent, deleteEvent } from './../../lib/firebase';
import { EventEdit } from './EventEdit';

export interface EventCardProps {
    did: string;
    eid: string;
    event: BartabelloEvent;
    handleCardExpand: (eid: string) => void;
    expanded: boolean;
}

export interface EventCardState {
    event: BartabelloEvent;
}

export class EventCard extends React.Component<EventCardProps, EventCardState> {
    constructor(props: EventCardProps) {
        super(props);
        this.state = {
            event: this.props.event
        }
    }

    handleDescriptionChange = (event: any): void => {
        this.setState({event: {...this.state.event, text: event.target.value}});
    }
    handleDateChange = (event: any, date: any): void => {
        this.setState({event: {...this.state.event, date: Moment(date).format('DD-MM-YYYY')}});
    }
    handleTimeChange = (event: any, date: any): void => {
        this.setState({event: {...this.state.event, time: Moment(date).format('HH:mm')}});
    }
    handleRepeatChange = (event: any, index: number, value: string): void => {
        this.setState({event: {...this.state.event, repeat: value}});
    }
    handleTimeInAdvanceChange = (event: any, index: number, value: string): void => {
        this.setState({event: {...this.state.event, timeInAdvance: value}});
    }

    handleEventUpdate = () => {
        console.log(this.state.event);
        const ts = Moment(this.state.event.date + ' ' + this.state.event.time, 'DD-MM-YYYY HH:mm');
        const event = {
            text: this.state.event.text,
            repeat: this.state.event.repeat,
            timeInAdvance: this.state.event.timeInAdvance,
            date: this.state.event.date,
            time: this.state.event.time,
            timestamp: ts.valueOf()
        }
        updateEvent(this.props.did, this.props.eid, event);
    }
    handleEventDelete = () => {
        deleteEvent(this.props.did, this.props.eid);
    }

    render() {
        return(
            <Card style={{margin: '4px', transition: 'height 500ms ease-in-out'}} 
                  expanded={this.props.expanded}
                  onExpandChange={() => this.props.handleCardExpand(this.props.eid)}
            >
                <CardHeader
                    title={this.props.event.text}
                    subtitle={this.state.event.date + ' - ' + this.state.event.time}
                    showExpandableButton={true}
                    actAsExpander={true}
                />
                {this.props.expanded ? (
                    <div style={{padding: '0px 16px 8px 16px'}}>
                        <EventEdit
                            handleDescriptionChange={this.handleDescriptionChange}
                            handleDateChange={this.handleDateChange}
                            handleTimeChange={this.handleTimeChange}
                            handleRepeatChange={this.handleRepeatChange}
                            handleTimeInAdvanceChange={this.handleTimeInAdvanceChange}
                            description={this.state.event.text}
                            date={this.state.event.date}
                            time={this.state.event.time}
                            repeat={this.state.event.repeat}
                            timeInAdvance={this.state.event.timeInAdvance}
                        />
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <IconButton 
                                tooltip="delete"
                                onClick={this.handleEventDelete}>
                                <DeleteIcon/>
                            </IconButton>
                            <RaisedButton
                                label="update"
                                primary={true}
                                icon={<DoneIcon/>}
                                onClick={this.handleEventUpdate}
                            />
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </Card>
        );
    }
}