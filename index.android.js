// @flow

"use strict";

import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, Button, ToastAndroid } from "react-native";

import PermissionsAndroid from "./js/utils/Extension";

export default class PermissionDemo extends Component {
    render(): React.Element<any> {
        return (
            <View style={ styles.container }>
                <Button
                    title={ "Camera" }
                    onPress={ this._requestCameraPermission }
                />
            </View>
        );
    }

    async _requestCameraPermission(): Promise {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Camera",
                    message: "应用拍照需要相机权限以正常使用"
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                ToastAndroid.show("获取相机权限成功", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show("相机权限获取被拒绝", ToastAndroid.SHORT);
            }
        } catch (err) {
            console.log(err);
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

AppRegistry.registerComponent("RNTemplate", () => PermissionDemo);
