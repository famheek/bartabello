import * as React from 'react';
import * as Moment from 'moment';
import { Card, TextField, DatePicker, TimePicker, SelectField, MenuItem, RaisedButton } from 'material-ui';
import AccessTimeIcon from 'material-ui/svg-icons/device/access-time';
import EventIcon from 'material-ui/svg-icons/action/event';
import AutoRenewIcon from 'material-ui/svg-icons/action/autorenew';
import AddIcon from 'material-ui/svg-icons/content/add';
import VisibilityIcon from 'material-ui/svg-icons/action/visibility';

import { addEvent } from './../../lib/firebase';
import { EventEdit } from './EventEdit';

export interface NewEventProps {
    did: string;
}

export interface NewEventState {
    description: string;
    date: string;
    time: string;
    repeat: string;
    timeInAdvance: string;
}

export class NewEvent extends React.Component<NewEventProps, NewEventState> {
    constructor(props: NewEventProps) {
        super(props);
        this.state = {
            description: '',
            date: '',
            time: '',
            repeat: 'never',
            timeInAdvance: '1h'
        }
    }

    handleDescriptionChange = (event: any): void => {
        this.setState({description: event.target.value});
    }
    handleDateChange = (event: any, date: any): void => {
        this.setState({
            date: Moment(date).format('DD-MM-YYYY')
        });
    }
    handleTimeChange = (event: any, date: any): void => {
        this.setState({
            time: Moment(date).format('HH:mm')
        });
    }
    handleRepeatChange = (event: any, index: number, value: string) => {
        this.setState({repeat: value});
    }
    handleTimeInAdvanceChange = (event: any, index: number, value: string) => {
        this.setState({timeInAdvance: value});
    }

    handleEventSave = () => {
        console.log(this.state);
        const ts = Moment(this.state.date + ' ' + this.state.time, 'DD-MM-YYYY HH:mm');
        const event = {
            text: this.state.description,
            repeat: this.state.repeat,
            timeInAdvance: this.state.timeInAdvance,
            date: this.state.date,
            time: this.state.time,
            timestamp: ts.valueOf()
        }
        addEvent(this.props.did, event);
        this.setState({description: ''});
    }

    render() {
        return(
            <Card style={{padding: '0px 16px 8px 16px', margin: '4px'}}>
                <EventEdit
                    handleDescriptionChange={this.handleDescriptionChange}
                    handleDateChange={this.handleDateChange}
                    handleTimeChange={this.handleTimeChange}
                    handleRepeatChange={this.handleRepeatChange}
                    handleTimeInAdvanceChange={this.handleTimeInAdvanceChange}
                    description={this.state.description}
                    date={this.state.date}
                    time={this.state.time}
                    repeat={this.state.repeat}
                    timeInAdvance={this.state.timeInAdvance}
                />
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <RaisedButton
                        label="add"
                        primary={true}
                        icon={<AddIcon/>}
                        disabled={!this.state.description || !this.state.date || !this.state.time}
                        onClick={this.handleEventSave}
                    />
                </div>
            </Card>
        );
    }
}