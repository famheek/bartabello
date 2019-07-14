import * as React from 'react';

import { DateText } from './DateText';
import { TimeText } from './TimeText';
import { Events } from './Events';

export interface DashboardProps {
    did: string;
}

export interface DashboardState {
    time: Date;
}

export class Dashboard extends React.Component<DashboardProps, DashboardState> {
    constructor(props: DashboardProps) {
        super(props);
        this.state = {
            time: new Date()
        }
    }
    componentDidMount() {
        setInterval(() => {
            console.log('time update');
            this.setState({time: new Date()});
        }, 5 * 1000);
    }
    render() {
        return(
            <div style={{
                backgroundColor: '#000000',
                color: '#ffffff',
                height: '100vh'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <DateText time={this.state.time}/>
                    <TimeText time={this.state.time}/>
                    <img src="src/assets/seperator.svg" style={{margin: '32px'}}/>
                    <Events did={this.props.did} time={this.state.time}/>
                </div>
            </div>
        );
    }
}