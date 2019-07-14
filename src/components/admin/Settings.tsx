import * as React from 'react';
import * as Firebase from 'firebase';
import { Card, Toggle } from 'material-ui';

import { setTtsTime, setTtsEvent } from './../../lib/firebase';

export interface SettingsProps {
    did: string;
}

export interface SettingsState {
    ttsTime: boolean;
    ttsEvent: boolean;
}

export class Settings extends React.Component<SettingsProps, SettingsState> {
    constructor(props: SettingsProps) {
        super(props);
        this.state = {
            ttsTime: false,
            ttsEvent: false
        }
    }

    componentWillMount() {
        const ref = Firebase.database().ref('dashboards/' + this.props.did + '/settings/tts');
        ref.child('time/enabled').once('value').then((s) => {
            this.setState({ttsTime: s.val()});
        });
        ref.child('event/enabled').once('value').then((s) => {
            this.setState({ttsEvent: s.val()});
        });
    }

    handleTtsTimeToggle = (event: any, toggled: boolean) => {
        this.setState({ttsTime: toggled});
        setTtsTime(this.props.did, toggled).then(() => {
            this.setState({ttsTime: toggled});
        });
    }
    handleTtsEventToggle = (event: any, toggled: boolean) => {
        this.setState({ttsEvent: toggled});
        setTtsEvent(this.props.did, toggled).then(() => {
            this.setState({ttsEvent: toggled});
        });
    }

    render() {
        return(
            <Card style={{margin: '4px', padding: '16px'}}>
                <Toggle
                    label="text to speech time"
                    onToggle={this.handleTtsTimeToggle}
                    toggled={this.state.ttsTime}
                />
                <Toggle
                    label="text to speech event"
                    onToggle={this.handleTtsEventToggle}
                    toggled={this.state.ttsEvent}
                />
            </Card>
        );
    }
}