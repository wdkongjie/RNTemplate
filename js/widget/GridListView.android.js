// @flow

"use strict";

import React, { Component } from "react";
import { StyleSheet, FlatList, View, Dimensions } from "react-native";
import { style as ViewStyleProp } from "ViewPropTypes";
import ColorPropType from "ColorPropType";

import { Color, Dimen } from "../res/values/Config";

const { width: screenWidth } = Dimensions.get("window");

export default class GridListView extends Component {
    props: {
        pEnableSeparator?: boolean,
        pSeparatorSize?: number,
        pSeparatorColor?: ColorPropType,
        pItemStyle?: ViewStyleProp | number
    };

    static defaultProps = {
        numColumns: 3,
        pEnableSeparator: false,
        pSeparatorSize: Dimen.ListSeparatorSize,
        pSeparatorColor: Color.ListSeparatorColor
    };

    constructor(props: any) {
        super(props);

        this._generateItem = this._generateItem.bind(this);
    }

    render(): React.Element<any> {
        var props = Object.assign({}, this.props, {renderItem: null});
        return (
            <FlatList
                { ...props }
                renderItem={ this._generateItem }
            />
        );
    }

    _generateItem(info: {item: any, index: number, separators: any}): React.Element<any> {
        const { pEnableSeparator, pSeparatorSize, pSeparatorColor, pItemStyle, numColumns, renderItem, data } = this.props;
        const width = screenWidth / numColumns;
        var style = Object.assign({}, StyleSheet.flatten(styles.item));
        if (pItemStyle) {
            style = Object.assign({}, style, pItemStyle);
        }
        style.width = width;
        if (!style.height) {
            style.height = width;
        }
        if (pEnableSeparator) {
            style.borderColor = pSeparatorColor;
            var maxRows = parseInt((data.length + 2) / numColumns);
            if (parseInt((info.index + 3) / numColumns) !== maxRows) {
                style.borderBottomWidth = pSeparatorSize;
            }
            if ((info.index + 1) % numColumns !== 0) {
                style.borderRightWidth = pSeparatorSize;
            }
        }
        return (
            <View style={ style } collapsable={ false }>
                { renderItem(info) }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        justifyContent: "center",
        alignItems: "center"
    }
});
