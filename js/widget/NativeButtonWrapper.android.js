// @flow

"use strict";

import React, { Component } from "react";
import { TouchableNativeFeedback } from "react-native";

/**
 * android原生点击效果封装
 * 
 * @export
 * @class NativeButtonWrapper
 * @extends {Component}
 */
export default class NativeButtonWrapper extends Component {
    props: {
        pOnPress: () => void
    };

    static defaultProps={
        pOnPress: () => null,
        background: TouchableNativeFeedback.SelectableBackground()
    };

    render(): React.Element<any> {
        const { pOnPress, background } = this.props;

        return (
            <TouchableNativeFeedback
                onPress={ pOnPress }
                background={ background }
            >
                { this.props.children }
            </TouchableNativeFeedback>
        );
    }
}
