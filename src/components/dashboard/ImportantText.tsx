import * as React from 'react';

import { Text } from './Text';

export interface ImportantTextProps {
    text: string;
}

export class ImportantText extends React.Component<ImportantTextProps, {}> {
    constructor(props: ImportantTextProps) {
        super(props);
    }
    render() {
        return(
            <>
                {
                    this.props.text.split(' ').filter((word) => word.length > 0).map((word, i) => {
                        // && !/^-{0,1}\d+$/.test(word)
                        return word === word.toUpperCase() ? (
                            <span key={i} style={{
                                fontSize: '64px',
                                textTransform: 'uppercase',
                                marginLeft: '8px',
                                marginRight: '8px',
                                fontWeight: 500,
                            }}>
                                {word}
                            </span>
                        ) : (
                            <Text key={i} text={word}/>
                        );
                    })
                }
            </>
        );
    }
}