import * as React from 'react';
import * as Moment from 'moment';

import { ImportantText } from './ImportantText';
import { Text } from './Text';

export interface DateTextProps {
    time: Date;
}

export class DateText extends React.Component<DateTextProps, {}> {
    constructor(props: DateTextProps) {
        super(props);
    }
    render() {
        return(
            <div style={{margin: '32px'}}>
                <ImportantText text="vandaag is het"/>
                <ImportantText text={Moment(this.props.time).locale('nl').format('dddd').toUpperCase()}/>
                <Text text={Moment(this.props.time).locale('nl').format('D MMMM YYYY')}/>
            </div>
        );
    }
}