import * as React from 'react';

export interface TextProps {
    text: string;
}

export class Text extends React.Component<TextProps, {}> {
    constructor(props: TextProps) {
        super(props);
    }
    render() {
        return(
            <span style={{
                marginLeft: '2px',
                marginRight: '2px',
                fontSize: '32px',
                fontWeight: 500,
                textTransform: 'uppercase'
            }}>
                {this.props.text}
            </span>
        );
    }
}