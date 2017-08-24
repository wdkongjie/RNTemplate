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
    static defaultProps={
        background: TouchableNativeFeedback.SelectableBackground()
    };

    render(): React.Element<any> {
        return (
            <TouchableNativeFeedback
                { ...this.props }
            >
                { this.props.children }
            </TouchableNativeFeedback>
        );
    }
}
