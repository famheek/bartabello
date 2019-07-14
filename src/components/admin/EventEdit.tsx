import * as React from 'react';
import * as Moment from 'moment';
import { TextField, DatePicker, TimePicker, SelectField, MenuItem } from 'material-ui';

import AccessTimeIcon from 'material-ui/svg-icons/device/access-time';
import EventIcon from 'material-ui/svg-icons/action/event';
import AutoRenewIcon from 'material-ui/svg-icons/action/autorenew';
import VisibilityIcon from 'material-ui/svg-icons/action/visibility';

export interface EventEditProps {
    handleDescriptionChange: (event: any) => void;
    handleDateChange: (event: any, date: any) => void;
    handleTimeChange: (event: any, date: any) => void;
    handleRepeatChange: (event: any, index: number, value: string) => void;
    handleTimeInAdvanceChange: (event: any, index: number, value: string) => void;
    description: string;
    date: string;
    time: string;
    repeat: string;
    timeInAdvance: string;
}

export interface EventEditState {

}

export class EventEdit extends React.Component<EventEditProps, EventEditState> {
    constructor(props: EventEditProps) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <>
                <TextField
                    floatingLabelText="Description"
                    value={this.props.description}
                    onChange={this.props.handleDescriptionChange}
                    style={{padding: '2px'}}
                    hintText="BELANGRIJK evenement"
                />
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <AccessTimeIcon style={{padding: '16px 8px 0px 0px'}}/>
                        <DatePicker
                            hintText={Moment().format('YYYY-MM-DD')}
                            container="inline"
                            style={{padding: '2px'}}
                            onChange={this.props.handleDateChange}
                        />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <EventIcon style={{padding: '16px 8px 0px 0px'}}/>
                        <TimePicker
                            hintText={Moment().format('HH:mm')}
                            format="24hr"
                            style={{padding: '2px'}}
                            onChange={this.props.handleTimeChange}
                        />
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                        <AutoRenewIcon style={{padding: '40px 8px 0px 0px'}}/>
                        <SelectField
                            floatingLabelText="Repeat"
                            value={this.props.repeat}
                            onChange={this.props.handleRepeatChange}
                            style={{padding: '2px'}}
                        >
                            {['never', 'daily', 'weekly', 'monthly'].map((t) => (
                                <MenuItem key={t} value={t} primaryText={t}/>
                            ))}
                        </SelectField>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <VisibilityIcon style={{padding: '40px 8px 0px 0px'}}/>
                        <SelectField
                            floatingLabelText="Display"
                            value={this.props.timeInAdvance}
                            onChange={this.props.handleTimeInAdvanceChange}
                            style={{padding: '2px'}}
                        >
                            <MenuItem key={'30m'} value={'30m'} primaryText={'30 minutes in advance'}/>
                            <MenuItem key={'1h'} value={'1h'} primaryText={'1 hour in advance'}/>
                            <MenuItem key={'2h'} value={'2h'} primaryText={'2 hours in advance'}/>
                            <MenuItem key={'4h'} value={'4h'} primaryText={'4 hours in advance'}/>
                            <MenuItem key={'8h'} value={'8h'} primaryText={'8 hours in advance'}/>
                        </SelectField>
                    </div>
                </div>
            </>
        );
    }
}