// @flow

"use strict";

import React, { Component } from "react";
import { StyleSheet, ToolbarAndroid, Image, BackHandler } from "react-native";

import { Color, Dimen } from "../res/values/Config";

type OnBackHandlerType = () => boolean;

/**
 *使用模式基本同ToolbarAndroid,封装了navIcon支持以及点击操作，其它
 *属性一致 
 * 
 * @export
 * @class StandardToolbar
 * @extends {Component}
 */
export default class StandardToolbar extends Component {
    props: {
        pNavEnable?: boolean,
        pNavIcon?: Image.propTypes.source,
        pOnBackHandler?: ?OnBackHandlerType
    };

    static defaultProps = {
        pNavEnable: false,
        pNavIcon: require("../res/drawable/ic_white_back.png")
    };

    constructor(props: any) {
        super(props);

        const { pOnBackHandler } = props;
        this.onBackHandler = () => {
            if (pOnBackHandler) {
                return pOnBackHandler();
            }
            return false;
        };
    }

    componentWillMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackHandler);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackHandler);
    }

    render(): React.Element<any> {
        console.log(this.props);
        const { pNavEnable, pNavIcon, pOnBackHandler, style } = this.props;

        return (
            <ToolbarAndroid
                { ...this.props }
                navIcon={ pNavEnable ? pNavIcon : null }
                style={ style ? [StyleSheet.flatten(styles.toolbar), style] : styles.toolbar }
                onIconClicked={ () => {
                    if (!!pOnBackHandler && pOnBackHandler()) {
                        return;
                    }
                    BackHandler.exitApp();
                } }
            />
        );
    }
}

const styles = StyleSheet.create({
    toolbar: {
        alignSelf: "stretch",
        backgroundColor: Color.ColorPrimary,
        height: Dimen.ActionBarHeight
    }
});
