// @flow

"use strict";

import React, { Component } from "react";
import { StyleSheet, ToolbarAndroid, View, Text, Image, BackHandler, Dimensions } from "react-native";
import ColorPropType from "ColorPropType";

import { Color, Dimen } from "../res/values/Config";

type OnBackHandlerType = () => boolean;

const { width: screenWidth } = Dimensions.get("window");

/**
 * 标题居中的toolbar,支持一级标题以及二级标题
 * actions菜单项有可能会覆盖标题，最好采用never模式
 * 
 * @export CenterToolbar
 * @class CenterToolbar
 * @extends {Component}
 */
export default class CenterToolbar extends Component {
    props: {
        pTitle?: string,
        pTitleColor?: ColorPropType,
        pSubTitle?: string,
        pSubTitleColor?: ColorPropType,
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
        this.first = true;
        this._renderTitleElement = this._renderTitleElement.bind(this);
        this._onLayout = this._onLayout.bind(this);
        this.state = { offset: 0, titleWidth: 0 };
    }

    componentWillMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackHandler);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackHandler);
    }

    render(): React.Element<any> {
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
            >
                { this._renderTitleElement() }
            </ToolbarAndroid>
        );
    }

    _renderTitleElement(): React.Element<any> {
        const { offset, titleWidth } = this.state;
        const margin = (screenWidth - titleWidth) / 2 - offset;
        const {pTitle, pTitleColor, pSubTitle, pSubTitleColor} = this.props;
        const titleStyle = [StyleSheet.flatten(styles.title), {marginLeft: titleWidth > 0 ? margin : 0}];
        const subTitleStyle = [StyleSheet.flatten(styles.subTitle), {marginLeft: titleWidth > 0 ? margin : 0}];

        return (
            <View style={ styles.center } collapsable={ !pSubTitle } opacity={ this.first ? 0 : 1 }>
                <Text ref='title' style={ pTitleColor ? [titleStyle, {color: pTitleColor}] : titleStyle }
                    onLayout={ this._onLayout }
                >
                    {pTitle}
                </Text>
                {
                    pSubTitle && (
                        <Text style={ pSubTitleColor ? [subTitleStyle, {color: pSubTitleColor}] : subTitleStyle }
                        >
                            {pSubTitle}
                        </Text>
                    )
                }
            </View>
        );
    }

    _onLayout({ nativeEvent: { layout: {x, y, width, height} } }: any) {
        if (!this.first) {
            return;
        }

        this.refs.title.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
            this.first = false;
            this.setState({offset: pageX, titleWidth: width});
        });
    }
}

const styles = StyleSheet.create({
    toolbar: {
        alignSelf: "stretch",
        backgroundColor: Color.ColorPrimary,
        height: Dimen.ActionBarHeight
    },
    center: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        height: Dimen.ActionBarHeight // 解决标题居中问题
    },
    title: {
        color: Color.TextColorPrimary,
        fontSize: Dimen.ActionBarTitleSize
    },
    subTitle: {
        color: Color.TextColorSecond,
        fontSize: Dimen.ActionBarSubTitleSize
    }
});
