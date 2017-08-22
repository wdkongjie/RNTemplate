// @flow

import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    View,
    Text
} from "react-native";

import CenterToolbar from "./js/widget/CenterToolbar";
import NormalListView from "./js/widget/NormalListView";

export default class ListViewDemo extends Component {
    constructor(props: any) {
        super(props);

        this.state = {
            refreshing: false,
            loading: "idle"
        };
    }

    render(): React.Element<any> {
        console.log(this.props);
        return (
            <View style={ styles.container }>
                <CenterToolbar
                    pTitle={ "FlatList" }
                    pTitleColor={ "#FFFFFF" }
                />

                <NormalListView
                    pEnableSeparator
                    pSeparatorSize={ 2 }
                    pSeparatorColor={ "#FF0000" }
                    data={ this._generateData() }
                    keyExtractor={ this._generateKey }
                    renderItem={ this._renderItem }
                    onRefresh={ () => {
                        this.setState((prevState: any, props: any) => {
                            return Object.assign({}, prevState, {refreshing: true});
                        });
                        setTimeout(() => {
                            this.setState((prevState: any, props: any) => {
                                return Object.assign({}, prevState, {refreshing: false});
                            });
                        }, 3000);
                    } }
                    refreshing={ this.state.refreshing }
                    pOnLoadMore={ () => {
                        this.setState((prevState: any, props: any) => {
                            return Object.assign({}, prevState, {loading: "loading"});
                        });
                        setTimeout(() => {
                            this.setState((prevState: any, props: any) => {
                                return Object.assign({}, prevState, {loading: "noMore"});
                            });
                        }, 3000);
                    } }
                    pLoading={ this.state.loading }
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
            <View style={ styles.item }>
                <Text>
                    { `index(${index}):` }
                </Text>
                <Text>
                    { item }
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        height: 45
    }
});

AppRegistry.registerComponent("RNTemplate", () => ListViewDemo);
