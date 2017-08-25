// @flow

"use strict";

import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, Button, Text, ToastAndroid } from "react-native";

import CustomModal from "./js/widget/CustomModal";

export default class ModalDemo extends Component {
    render(): React.Element<any> {
        return (
            <View style={ styles.container } >
                <CustomModal
                    ref={ (self: CustomModal) => {
                        this.modal = self;
                    } }
                    pTitle={ "Title" }
                    pOnOk={ () => {
                        ToastAndroid.show("ok clicked", ToastAndroid.SHORT);
                        if (this.modal) {
                            this.modal.dismiss();
                        }
                    } }
                    pOnCancel={ () => {
                        ToastAndroid.show("cancel clicked", ToastAndroid.SHORT);
                        if (this.modal) {
                            this.modal.dismiss();
                        }
                    } }
                >
                    <Text>
                        测试
                    </Text>
                </CustomModal>

                <Button
                    title={ "show" }
                    onPress={ () => {
                        if (this.modal) {
                            this.modal.show();
                        }
                    } }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "#00000060"
    },
    content: {
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
        backgroundColor: "#FFFFFF"
    }
});

AppRegistry.registerComponent("RNTemplate", () => ModalDemo);
