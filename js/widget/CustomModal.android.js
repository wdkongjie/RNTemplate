// @flow

"use strict";

import React, { Component } from "react";
import { StyleSheet, Modal, View, Text, TouchableNativeFeedback } from "react-native";
import { style as ViewStyleProp } from "ViewPropTypes";

import { Color, InfoString } from "../res/values/Config";

/**
 * modal dialog样式封装，支持标题，支持确定、取消按钮
 * 
 * @export
 * @class CustomModal
 * @extends {Component}
 */
export default class CustomModal extends Component {
    props: {
        pAnimationType?: "none" | "slide" | "fade",
        pTransparent?: boolean,
        pEnableCancel?: boolean,
        pEnableOutsideCancel?: boolean,
        pTitle?: string,
        pContainerStyle?: ViewStyleProp,
        pContentStyle?: ViewStyleProp,
        pTitleStyle?: ViewStyleProp,
        pButtonStyle?: ViewStyleProp,
        pOnOk?: () => void,
        pOnCancel?: () => void
    }

    static defaultProps = {
        pAnimationType: "fade",
        pTransparent: true,
        pEnableCancel: true,
        pEnableOutsideCancel: true
    }

    constructor(props: any) {
        super(props);

        this.state = {
            visible: false
        };

        this.show = this.show.bind(this);
        this.dismiss = this.dismiss.bind(this);
    }

    render(): React.Element<any> {
        const { pAnimationType, pTransparent, pEnableCancel, pEnableOutsideCancel, pTitle, pOnOk, pOnCancel } = this.props;
        var containerStyle = Object.assign({}, StyleSheet.flatten(styles.container));
        if (!pTransparent) {
            containerStyle.backgroundColor = null;
        }
        if (this.props.pContainerStyle) {
            containerStyle = Object.assign({}, containerStyle, this._getStyleObject(this.props.pContainerStyle));
        }
        var contentStyle = styles.content;
        if (this.props.pContentStyle) {
            contentStyle = Object.assign({}, StyleSheet.flatten(styles.content), this._getStyleObject(this.props.pContentStyle));
        }
        var titleStyle = styles.title;
        if (this.props.pTitleStyle) {
            titleStyle = Object.assign({}, StyleSheet.flatten(styles.title), this._getStyleObject(this.props.pTitleStyle));
        }

        return (
            <Modal
                animationType={ pAnimationType }
                transparent={ pTransparent }
                visible={ this.state.visible }
                onRequestClose={ pEnableCancel ? () => {
                    this.dismiss();
                } : null }
            >
                <View
                    style={ containerStyle }
                    pointerEvents={ (pEnableCancel && pEnableOutsideCancel) ? "auto" : "box-none" }
                    onStartShouldSetResponder={ (event: any) => {
                        return true;
                    } }
                    onResponderGrant={ (event: any) => {
                        this.dismiss();
                    } }
                >
                    <View
                        style={ contentStyle }
                        onStartShouldSetResponder={ (event: any) => {
                            return true;
                        } }
                    >
                        {
                            pTitle && (
                                <Text
                                    style={ titleStyle }
                                    numberOfLines={ 1 }
                                    ellipsizeMode={ "tail" }>
                                    { pTitle }
                                </Text>
                            )
                        }

                        { this.props.children }

                        {
                            (pOnOk || pOnCancel) && (
                                <View style={ styles.buttonContainer }>
                                    {
                                        pOnCancel && this._generateButton(InfoString.Cancel, pOnCancel)
                                    }

                                    {
                                        pOnOk && this._generateButton(InfoString.Ok, pOnOk)
                                    }
                                </View>
                            )
                        }
                    </View>
                </View>
            </Modal>
        );
    }

    show() {
        this.setState({ visible: true });
    }

    dismiss() {
        this.setState({ visible: false });
    }

    _generateButton(title: string, pressHandler: () => void): React.Element<any> {
        const { pButtonStyle } = this.props;
        var buttonStyle = styles.button;
        if (pButtonStyle) {
            buttonStyle = Object.assign({}, StyleSheet.flatten(styles.button), this._getStyleObject(pButtonStyle));
        }

        return (
            <TouchableNativeFeedback
                useForeground
                background={ TouchableNativeFeedback.SelectableBackground() }
                onPress={ pressHandler }
            >
                <View>
                    <Text style={ buttonStyle }>
                        { title }
                    </Text>
                </View>
            </TouchableNativeFeedback>
        );
    }

    _getStyleObject(style: any): Object {
        if (typeof style === "object") {
            return style;
        } else if (typeof style === "number") {
            return StyleSheet.flatten(style);
        }
        return undefined;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: Color.DialogLikeColor
    },
    content: {
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
        backgroundColor: "#FFFFFF"
    },
    title: {
        fontSize: 20,
        color: Color.ColorPrimary
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    button: {
        fontSize: 13,
        color: Color.ColorPrimary,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 3,
        paddingBottom: 3
    }
});
