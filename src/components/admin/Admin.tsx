import * as React from 'react';
import * as Moment from 'moment';
import { Card, List, Subheader, ListItem } from 'material-ui';
import { Link } from 'react-router-dom';

import { NewEvent } from './NewEvent';
import { Events } from './Events';
import { Settings } from './Settings';

export interface AdminProps {
    did: string;
}

export interface AdminState {
}

export class Admin extends React.Component<AdminProps, AdminState> {
    constructor(props: AdminProps) {
        super(props);
    }

    render() {
        return(
            <div style={{maxHeight: '100vh', overflow: 'auto', WebkitOverflowScrolling: 'touch', backgroundColor: '#fafafa'}}>
                <Subheader>Link to Dashboard</Subheader>
                <Card style={{padding: '16px', margin: '4px'}}>
                    <Link to={'/' + this.props.did + '/dashboard'}>{this.props.did}</Link>
                </Card>

                <Subheader>New Event</Subheader>
                <NewEvent did={this.props.did}/>

                <Subheader>Planned Events</Subheader>
                <Events did={this.props.did}/>

                <Subheader>Settings</Subheader>
                <Settings did={this.props.did}/>
                <div style={{height: '128px'}}/>
            </div>
        );
    }
}