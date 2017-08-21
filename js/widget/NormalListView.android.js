// @flow

"use strict";

import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, ActivityIndicator, RefreshControl } from "react-native";
import ColorPropType from "ColorPropType";

import NativeButtonWrapper from "./NativeButtonWrapper";
import { Color, Dimen, InfoString } from "../res/values/Config";

/**
 * 
 * 支持下拉刷新，上拉加载
 * 
 * @export
 * @class NormalListView
 * @extends {Component}
 */
export default class NormalListView extends Component {
    props: {
        pEnableSeparator?: boolean,
        pSeparatorSize?: number,
        pSeparatorColor?: ColorPropType,
        pRefreshIndicatorColor?: ColorPropType[],
        pLoadIndicatorColor?: ColorPropType,
        pLoadTextStyle?: Text.propTypes.style,
        pLoading?: "idle" | "loading" | "noMore",
        pOnLoadMore?: ?() => void
    };

    static defaultProps={
        pEnableSeparator: true,
        pRefreshIndicatorColor: [Color.ColorPrimary],
        pLoadIndicatorColor: Color.ColorPrimary,
        pLoading: "idle"
    };

    constructor(props: any) {
        super(props);

        this._defaultSeparatorRender = this._defaultSeparatorRender.bind(this);
        this._defaultFooterRender = this._defaultFooterRender.bind(this);
        this._defaultLoaderMoreRender = this._defaultLoaderMoreRender.bind(this);
        this._defaultLoadingRender = this._defaultLoadingRender.bind(this);
    }

    render(): React.Element<any> {
        const { pEnableSeparator, ItemSeparatorComponent, pOnLoadMore } = this.props;
        var enableSeparator = !!pEnableSeparator;
        if (ItemSeparatorComponent) {
            enableSeparator = false;
        }
        var props = Object.assign({}, this.props, {onRefresh: null, ListFooterComponent: null});
        if (enableSeparator) {
            props.ItemSeparatorComponent = this._defaultSeparatorRender;
        }
        return (
            <FlatList { ...props }
                ListFooterComponent={ pOnLoadMore ? this._defaultFooterRender : this.props.ListFooterComponent }
                refreshControl={
                    <RefreshControl
                        enable={ !!this.props.onRefresh }
                        onRefresh={ this.props.onRefresh ? this.props.onRefresh : null }
                        refreshing={ !!this.props.refreshing }
                        colors={ [this.props.pRefreshIndicatorColor] }
                    />
                }
            />
        );
    }

    _defaultSeparatorRender(): React.Element<any> {
        var separatorStyle;
        const { horizontal, pSeparatorSize, pSeparatorColor } = this.props;
        if (horizontal) {
            separatorStyle = StyleSheet.flatten(styles.horizontalSeparator);
            if (pSeparatorSize) {
                separatorStyle = [ separatorStyle, { width: pSeparatorSize } ];
            }
        } else {
            separatorStyle = StyleSheet.flatten(styles.verticalSeparator);
            if (pSeparatorSize) {
                separatorStyle = [ separatorStyle, { height: pSeparatorSize } ];
            }
        }

        if (pSeparatorColor) {
            separatorStyle = [ separatorStyle, { backgroundColor: pSeparatorColor } ];
        }

        return (
            <View style={ separatorStyle } />
        );
    }

    _defaultFooterRender(): React.Element<any> {
        const { pLoading } = this.props;
        if (pLoading === "loading") {
            return this._defaultLoadingRender();
        } else {
            return this._defaultLoaderMoreRender();
        }
    }

    _defaultLoaderMoreRender(): React.Element<any> {
        const { pLoading, pOnLoadMore } = this.props;
        const enable = pLoading === "idle";
        return (
            <NativeButtonWrapper pOnPress={ enable ? pOnLoadMore : null }>
                <View style={ styles.more } >
                    <Text style={ styles.moreText }>
                        { enable ? InfoString.LoadMore : InfoString.NoMoreLoad }
                    </Text>
                </View>
            </NativeButtonWrapper>
        );
    }

    _defaultLoadingRender(): React.Element<any> {
        const { pLoadIndicatorColor } = this.props;
        return (
            <View style={ styles.more } >
                <ActivityIndicator color={ pLoadIndicatorColor } />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    verticalSeparator: {
        height: Dimen.ListSeparatorSize,
        backgroundColor: Color.ListSeparatorColor
    },
    horizontalSeparator: {
        width: Dimen.ListSeparatorSize,
        backgroundColor: Color.ListSeparatorColor
    },
    more: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    moreText: {
        fontSize: 16,
        color: Color.ColorPrimary
    }
});
