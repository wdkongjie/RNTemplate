// @flow

"use strict";

import { InfoString } from "../res/values/Config";

export type RationaleType = {
    title: string,
    message: string
};

const NativeModules = require("NativeModules");

var PermissionsAndroid = require("PermissionsAndroid");

PermissionsAndroid.request = async(permission: string, rationale?: RationaleType) => {
    const granted = await NativeModules.PermissionsAndroid.requestPermission(permission);
    if (granted === PermissionsAndroid.RESULTS.DENIED && rationale) {
        return new Promise((resolve: (value: any) => void, reject: (err: Error) => void) => {
            NativeModules.DialogManagerAndroid.showAlert(
                {
                    title: rationale.title,
                    message: rationale.message,
                    buttonNegative: InfoString.PermissionsCancel,
                    buttonPositive: InfoString.PermissionsOk
                },
                () => reject(new Error("Error showing rationale")),
                (reason: string, which: int) => {
                    // console.log(`reason: ${reason}, which: ${which}`);
                    if (reason === "buttonClicked") {
                        if (which === -1) {
                            resolve(NativeModules.PermissionsAndroid.requestPermission(permission));
                            return;
                        }
                    }
                    resolve(PermissionsAndroid.RESULTS.DENIED);
                }
            );
        });
    }
    return granted;
};

module.exports = PermissionsAndroid;
