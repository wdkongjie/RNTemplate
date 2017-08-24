// @flow

"use strict";

import React, { Component } from "react";
import { AppRegistry, View, Text } from "react-native";

import CenterToolbar from "./js/widget/CenterToolbar";
import GridListView from "./js/widget/GridListView";

export default class GridListDemo extends Component {
    render(): React.Element<any> {
        return (
            <View style={ { flex: 1 } }>
                <CenterToolbar
                    pTitle={ "GridList" }
                />
                <GridListView
                    pEnableSeparator
                    pSeparatorSize={ 1 }
                    pSeparatorColor={ "#FF0000" }
                    numColumns={ 3 }
                    data={ this._generateData() }
                    keyExtractor={ this._generateKey }
                    renderItem={ this._renderItem }
                />
            </View>
        );
    }

    _generateData(): Array<any> {
        var data = [];
        for (var i = 0; i < 20; i++) {
            data.push("数据" + i);
        }
        return data;
    }

    _generateKey(item: any, index: number): string {
        return index.toString();
    }

    _renderItem({item, index}: any): ?React.Element<any> {
        return (
            <Text>
                {item}
            </Text>
        );
    }
}

AppRegistry.registerComponent("RNTemplate", () => GridListDemo);
