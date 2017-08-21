// @flow

import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    View,
    ToastAndroid
} from "react-native";

import StandardToolbar from "./js/widget/StandardToolbar";
import CenterToolbar from "./js/widget/CenterToolbar";

export default class RNTemplate extends Component {
    render(): React.Element<any> {
        return (
            <View style={ styles.container }>
                <StandardToolbar
                    title={ "title" }
                    subtitle={ "sub title" }
                    style={ {backgroundColor: "#FF0000"} }
                    pNavEnable
                    pOnBackHandler={ () => {
                        ToastAndroid.show("clicked", ToastAndroid.SHORT);
                        return true;
                    } }
                    actions={ [
                        {title: "menu1", show: "ifRoom"},
                        {title: "menu2", show: "ifRoom"},
                        {title: "menu3", show: "ifRoom"},
                        {title: "menu4", show: "ifRoom"}
                    ] }
                />

                <CenterToolbar
                    pTitle={ "title" }
                    pTitleColor={ "#00FF00" }
                    pSubTitle={ "sub title" } 
                    pSubTitleColor={ "#FF0000" }
                    actions={ [
                        {title: "menu1", show: "never"},
                        {title: "menu2", show: "never"},
                        {title: "menu3", show: "never"},
                        {title: "menu4", show: "never"}
                    ] }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    }
});

AppRegistry.registerComponent("RNTemplate", () => RNTemplate);
