import * as React from 'react';
import cn from 'classnames';
import Taro from '@tarojs/taro';
import { View, Text, Image, ScrollView, BaseEventOrigFunction, ScrollViewProps, CommonEventFunction, BaseEventOrig } from '@tarojs/components';

interface RowProps {
    /** 行样式 */
    className?: string;
    /** 行内联样式 */
    style?: React.CSSProperties;
    /** 点击行 */
    onTap?: CommonEventFunction;
}

export interface ColumnProps {
    /** 列名 */
    title: React.ReactNode;
    /** 列唯一标识 */
    key?: string;
    /** 列字段 */
    dataIndex?: string;
    /** 列宽 */
    width?: number;
    /** 样式 */
    className?: string;
    /** 内容水平位置 */
    align?: 'left' | 'center' | 'right';
    /** 固定列（设置此项时须设置列宽） */
    fixed?: 'left' | 'right';
    /** 文本超出省略
     * @description — boolean (true: 1行省略，false：默认不省略)
     * @description — number 指定行数省略
     */
    ellipsis?: boolean | number;
    /** 是否可排序 */
    sortable?: boolean;
    /** 排序方式 */
    sortOrder?: 'ascend' | 'descend';
    /** 自定义排序 */
    onSort?: (order?: 'ascend' | 'descend') => void;
    /** 自定义渲染内容 */
    render?: (value: any, record: any, index: number) => React.ReactNode;
}

export interface TableProps {
    id?: string;
    /** 表格列 */
    columns: ColumnProps[];
    /** 表格数据 */
    dataSource: any[];
    /** 样式 */
    className?: string;
    /** 内联样式 */
    style?: React.CSSProperties;
    /** Table 最外层的包裹容器样式名 */
    wrapperClassName?: string;
    /** Table 最外层的包裹容器内联样式 */
    wrapperStyle?: React.CSSProperties;
    /** 唯一标识 */
    rowKey?: string;
    /** 加载中遮罩 */
    loading?: boolean | LoadingProps;
    /** 空数据时显示 */
    empty?: TableEmptyProps;
    /** 滚动
     * @description — x: 容器宽度，内容宽度超过容器宽度时滚动
     * @description — y: 容器高度，内容高度超过容器高度时滚动
     */
    scroll?: { x?: number | string, y?: number | string };
    /** 行属性 */
    onRow?: (record: any, index: number) => RowProps;
    /**
     * 滚动时触发
     * @supported — weapp, alipay, swan, tt, qq, jd, h5, rn
     */
    onScroll?: BaseEventOrigFunction<ScrollViewProps.onScrollDetail>;
    /**
     * 滚动到底部/右边，会触发 scrolltolower 事件
     * @supported — weapp, alipay, swan, tt, qq, jd, h5, rn
     */
    onScrollToLower?: CommonEventFunction;
    /**
     * 滚动到顶部/左边，会触发 scrolltoupper 事件
     * @supported — weapp, alipay, swan, tt, qq, jd, h5, rn
     */
    onScrollToUpper?: CommonEventFunction;
}

interface TableRowProps extends RowProps {
    rowIndex: number;
    rowData: any;
    columns: ColumnProps[];
    sortedCol?: string;
    fixedLeftCols: FixedColsProps[];
    fixedRightCols: FixedColsProps[];
}

interface TableColGroupProps {
    columns: ColumnProps[];
}

interface TableEmptyProps {
    /** 自定义图片（src） */
    img?: string,
    /** 自定义提示文字 */
    text?: string;
}

interface FixedColsProps {
    index: number;
    left?: number;
    right?: number;
    width: number;
    lastLeft?: boolean;
    firstRight?: boolean;
}

interface LoadingProps {
    /** 是否显示 Loading */
    show?: boolean,
    /** 自定义loading图片（src） */
    img?: string,
    /** 自定义loading文字 */
    text?: string;
}

interface TableLoadingProps {
    loading?: boolean | LoadingProps;
    children?: any;
}

const TableLoadingWrapper: React.FC<TableLoadingProps> = (props) => {
    if (typeof props.loading === 'undefined' ||
        (typeof props.loading === 'boolean' && !props.loading) ||
        (typeof props.loading === 'object' && !props.loading?.show)
    ) {
        return props.children;
    }

    const imgEle = typeof props.loading === 'object' && props.loading.img ?
        <Image className="tarojs-table-loading-img" mode="widthFix" src={props.loading.img} /> :
        <Image className="tarojs-table-loading-img" mode="widthFix" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxjaXJjbGUgY3g9IjEyIiBjeT0iMi41IiByPSIxLjUiIGZpbGw9IiM5MDlhYWEiIG9wYWNpdHk9Ii4xNCIvPjxjaXJjbGUgY3g9IjE2Ljc1IiBjeT0iMy43NyIgcj0iMS41IiBmaWxsPSIjOTA5YWFhIiBvcGFjaXR5PSIuMjkiLz48Y2lyY2xlIGN4PSIyMC4yMyIgY3k9IjcuMjUiIHI9IjEuNSIgZmlsbD0iIzkwOWFhYSIgb3BhY2l0eT0iLjQzIi8+PGNpcmNsZSBjeD0iMjEuNSIgY3k9IjEyIiByPSIxLjUiIGZpbGw9IiM5MDlhYWEiIG9wYWNpdHk9Ii41NyIvPjxjaXJjbGUgY3g9IjIwLjIzIiBjeT0iMTYuNzUiIHI9IjEuNSIgZmlsbD0iIzkwOWFhYSIgb3BhY2l0eT0iLjcxIi8+PGNpcmNsZSBjeD0iMTYuNzUiIGN5PSIyMC4yMyIgcj0iMS41IiBmaWxsPSIjOTA5YWFhIiBvcGFjaXR5PSIuODYiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjIxLjUiIHI9IjEuNSIgZmlsbD0iIzkwOWFhYSIvPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgY2FsY01vZGU9ImRpc2NyZXRlIiBkdXI9IjAuNzVzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgdHlwZT0icm90YXRlIiB2YWx1ZXM9IjAgMTIgMTI7MzAgMTIgMTI7NjAgMTIgMTI7OTAgMTIgMTI7MTIwIDEyIDEyOzE1MCAxMiAxMjsxODAgMTIgMTI7MjEwIDEyIDEyOzI0MCAxMiAxMjsyNzAgMTIgMTI7MzAwIDEyIDEyOzMzMCAxMiAxMjszNjAgMTIgMTIiLz48L2c+PC9zdmc+" />;

    const textEle = typeof props.loading === 'object' && props.loading.text ?
        <Text className="tarojs-table-loading-text">{props.loading.text}</Text> : '';

    return (<View className="tarojs-table-loading">
        <View className="tarojs-table-loading-content">
            {imgEle}
            {textEle}
        </View>
        {props.children}
    </View>)
}

const TableEmpty: React.FC<TableEmptyProps> = (props) => {
    const src = props.img || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNkNWQ1ZDUiIGQ9Ik0xNCAySDZhMiAyIDAgMCAwLTIgMnYxNmMwIDEuMTEuODkgMiAyIDJoMTJjMS4xMSAwIDItLjg5IDItMlY4bC02LTZtNCAxOEg2VjRoN3Y1aDV2MTFtLTMtN2MwIDEuODktMi4yNSAyLjA3LTIuMjUgMy43NmgtMS41YzAtMi40NCAyLjI1LTIuMjYgMi4yNS0zLjc2YzAtLjgyLS42Ny0xLjUtMS41LTEuNXMtMS41LjY4LTEuNSAxLjVIOWMwLTEuNjUgMS4zNC0zIDMtM3MzIDEuMzUgMyAzbS0yLjI1IDQuNVYxOWgtMS41di0xLjVoMS41WiIvPjwvc3ZnPg==';

    return (
        <View className="tarojs-table-empty">
            <Image
                className="tarojs-table-empty-img"
                mode="widthFix"
                src={src}
            />
            <Text className="tarojs-table-empty-text">
                {props.text || '暂无数据'}
            </Text>
        </View>
    );
}

const TableColGroup: React.FC<TableColGroupProps> = (props) => {
    return (<View className="tarojs-table-colgroup">
        {props.columns.map(col => (<View key={col.key || col.dataIndex} style={{ width: col.width }} />))}
    </View>)
}

const TableRow: React.FC<TableRowProps> = (props) => {
    return (
        <View
            style={props.style}
            className={cn('tarojs-table-row', props.className)}
        >
            {props.columns.map((col, index) => {
                const colValue = col.dataIndex ? props.rowData[col.dataIndex] : undefined;
                const cellContent = col.render ? col.render(colValue, props.rowData, props.rowIndex) : colValue;
                const fixedLeftCol = props.fixedLeftCols.find(m => m.index === index);
                const fixedRightCol = props.fixedRightCols.find(m => m.index === index);
                const left = fixedLeftCol?.left;
                const right = fixedRightCol?.right;

                return (
                    <View
                        key={col.key || col.dataIndex}
                        style={{ left, right }}
                        className={cn({
                            'tarojs-table-cell': true,
                            'tarojs-table-fixed-column': Boolean(col.fixed) && props.fixedLeftCols.length > 0,
                            [`tarojs-table-fixed-${col.fixed}`]: Boolean(col.fixed) && props.fixedLeftCols.length > 0,
                            'tarojs-table-fixed-left-last': fixedLeftCol?.lastLeft,
                            'tarojs-table-fixed-right-first': fixedRightCol?.firstRight,
                            [`tarojs-table-align-${col.align}`]: Boolean(col.align),
                            'tarojs-table-sorted': Boolean(props.sortedCol === col.dataIndex) && col.sortable,
                        }, col.className)}
                        onTap={props.onTap}
                    >
                        <View
                            className={cn({ 'tarojs-table-ellipsis': Boolean(col.ellipsis) })}
                            style={typeof col.ellipsis === 'number' && col.ellipsis > 1 ? { lineClamp: col.ellipsis, WebkitLineClamp: col.ellipsis } : undefined}
                        >
                            {cellContent}
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

const Table: React.FC<TableProps> = (props) => {
    const ref = React.useRef({
        tableID: props.id || `_${Array.from({ length: 4 }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('')}`
    });
    const [fixedLeftCols, setFixedLeftCols] = React.useState<FixedColsProps[]>([]);
    const [fixedRightCols, setFixedRightCols] = React.useState<FixedColsProps[]>([]);
    const [containerWidth, setContainerWidth] = React.useState(0);
    const [sortCol, setSortCol] = React.useState({ dataIndex: '', order: '' });
    const fixedList = props.columns.map((col) => col.fixed).filter(Boolean);
    const widthList = props.columns.map((col) => col.width).filter(Boolean);

    (function () {
        const fixedCount = props.columns.filter(col => col.fixed).length;
        const fixedWidthCount = props.columns.filter(col => col.fixed && col.width && col.width > 0).length;

        if (fixedCount !== fixedWidthCount) {
            throw new Error('固定列缺少列宽，请给需要固定的列指定列宽');
        }
    })();

    React.useEffect(() => {
        let width = 0;
        Taro.createSelectorQuery()
            .select(`#${ref.current.tableID}`)
            .boundingClientRect((rect) => {
                width = rect?.width || 0;
                setContainerWidth(width);
            })
            .select(`#${ref.current.tableID} .tarojs-table`)
            .boundingClientRect((rect) => {
                const contentWidth = rect?.width || 0;

                if (contentWidth > width) {
                    setFixedRightCols(fixedRightCols.map((col, idx) => ({ ...col, firstRight: idx === 0 })));
                }
            }).exec();
    }, [props.dataSource, fixedRightCols.length]);

    /** 计算每个固定列的贴边位置 */
    React.useEffect(() => {
        const fixedLeftCols: FixedColsProps[] = [];
        const fixedRightCols: FixedColsProps[] = [];
        let left = 0;
        let right = props.columns.reduce((sum, col) => sum + (col.fixed === 'right' ? (col.width || 0) : 0), 0);

        props.columns.forEach((col, index) => {
            if (col.fixed === 'left') {
                fixedLeftCols.push({ index, left, width: col.width || 0, lastLeft: false });
                left = left + (col.width || 0);
            } else if (col.fixed === 'right') {
                right = right - (col.width || 0);
                fixedRightCols.push({ index: index, right, width: col.width || 0, firstRight: false });
            }
        });

        const fixedLeftIndexs = fixedLeftCols.map(col => col.index);
        const fixedRightIndexs = fixedRightCols.map(col => col.index);

        const missingLeftIndexs = fixedLeftIndexs.reduce((result, value, index, arr) => index === 0 ? result : result.concat(Array.from({ length: value - arr[index - 1] - 1 }, (_, i) => arr[index - 1] + i + 1)), [] as number[]);
        const missingRightIndexs = fixedRightIndexs.reduce((result, value, index, arr) => index === 0 ? result : result.concat(Array.from({ length: value - arr[index - 1] - 1 }, (_, i) => arr[index - 1] + i + 1)), [] as number[]);

        missingLeftIndexs.forEach(index => {
            console.error('Warning: ', `左固定列"index:${index}"缺失，建议固定列之间是连续的数据列`);
        });

        missingRightIndexs.forEach(index => {
            console.error('Warning: ', `右固定列"index:${index}"缺失，建议固定列之间是连续的数据列`);
        });

        setFixedLeftCols(fixedLeftCols);
        setFixedRightCols(fixedRightCols);
    }, [JSON.stringify(fixedList), JSON.stringify(widthList)]);

    /** 渲染表头 */
    const renderTableHeader = () => {
        return (
            <View className="tarojs-table-row">
                {props.columns.map((col, index) => {
                    const fixedLeftCol = fixedLeftCols.find(m => m.index === index);
                    const fixedRightCol = fixedRightCols.find(m => m.index === index);
                    const left = fixedLeftCol?.left;
                    const right = fixedRightCol?.right;
                    const sortOrder = col.onSort ? col.sortOrder : sortCol.order;
                    const nextOrder = sortOrder === 'ascend' ? 'descend' : sortOrder === 'descend' ? '' : 'ascend';

                    const sortFunc = () => {
                        if (col.sortable) {
                            if (col.onSort) {
                                col.onSort(nextOrder || undefined);
                                setSortCol({ dataIndex: '', order: '' });
                            } else {
                                setSortCol({ dataIndex: Boolean(nextOrder) ? (col.dataIndex || '') : '', order: nextOrder });
                            }
                        }
                    };

                    return (
                        <View
                            key={col.key || col.dataIndex}
                            style={{ left, right }}
                            className={cn({
                                'tarojs-table-cell': true,
                                'tarojs-table-fixed-header': Boolean(props.scroll?.y),
                                'tarojs-table-fixed-column': Boolean(col.fixed) && Boolean(props.scroll?.x),
                                [`tarojs-table-fixed-${col.fixed}`]: Boolean(col.fixed) && Boolean(props.scroll?.x),
                                'tarojs-table-fixed-left-last': fixedLeftCol?.lastLeft && Boolean(props.scroll?.x),
                                'tarojs-table-fixed-right-first': fixedRightCol?.firstRight && Boolean(props.scroll?.x),
                                [`tarojs-table-align-${col.align}`]: Boolean(col.align)
                            }, col.className)}
                        >
                            <View onTap={sortFunc}>
                                {col.title}
                                {col.sortable ? <View
                                    className={cn(
                                        "tarojs-table-sortable", {
                                        [`tarojs-table-sortable-${sortOrder}`]: Boolean(sortOrder)
                                    })}
                                /> : null}
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    };

    /** 渲染表格数据 */
    const renderTableBody = () => {
        const _dataSource = Boolean(sortCol.dataIndex) && Boolean(sortCol.order) && props.columns.some(col => col.dataIndex === sortCol.dataIndex && col.sortable && !Boolean(col.onSort)) ?
            [...props.dataSource].sort((a, b) => {
                if (sortCol.order === "ascend") {
                    return a[sortCol.dataIndex] > b[sortCol.dataIndex] ? 1 : -1;
                }

                return a[sortCol.dataIndex] > b[sortCol.dataIndex] ? -1 : 1
            })
            : props.dataSource;

        return _dataSource.map((record, index) => {
            const rowKey = props.rowKey && record[props.rowKey] || index.toString();

            return (
                <TableRow
                    key={rowKey}
                    rowData={record}
                    rowIndex={index}
                    sortedCol={sortCol.dataIndex}
                    columns={props.columns}
                    fixedLeftCols={Boolean(props.scroll?.x) ? fixedLeftCols : []}
                    fixedRightCols={Boolean(props.scroll?.x) ? fixedRightCols : []}
                    {...props.onRow?.(record, index)}
                />
            );
        });
    };

    /** 渲染表格 */
    const renderTable = () => {
        return (
            <View
                disableScroll="disableScroll"
                style={props.style}
                className={cn('tarojs-table', props.className)}
            >
                <TableColGroup columns={props.columns} />
                <View className="tarojs-table-thead">
                    {renderTableHeader()}
                </View>
                <View className="tarojs-table-tbody">
                    {renderTableBody()}
                </View>
            </View>
        );
    };

    const handleScroll = (e: BaseEventOrig<ScrollViewProps.onScrollDetail>) => {
        if (fixedLeftCols.length > 0) {
            if (e.detail.scrollLeft > 0 && !fixedLeftCols[fixedLeftCols.length - 1].lastLeft) {
                setFixedLeftCols(fixedLeftCols.map((col, idx) => ({ ...col, lastLeft: idx === (fixedLeftCols.length - 1) })));
            } else if (e.detail.scrollLeft === 0 && fixedLeftCols[fixedLeftCols.length - 1].lastLeft) {
                setFixedLeftCols(fixedLeftCols.map((col) => ({ ...col, lastLeft: false })));
            }
        }

        if (fixedRightCols.length > 0) {
            if ((e.detail.scrollLeft + containerWidth) < e.detail.scrollWidth && !fixedRightCols[0].firstRight) {
                setFixedRightCols(fixedRightCols.map((col, idx) => ({ ...col, firstRight: idx === 0 })));
            } else if ((e.detail.scrollLeft + containerWidth) === e.detail.scrollWidth && fixedRightCols[0].firstRight) {
                setFixedRightCols(fixedRightCols.map((col) => ({ ...col, firstRight: false })));
            }
        }

        props.onScroll?.(e);
    };

    if (props.dataSource.length === 0) {
        return (
            <TableLoadingWrapper loading={props.loading}>
                <View
                    style={{ ...props.wrapperStyle, maxWidth: props.scroll?.x, maxHeight: props.scroll?.y }}
                    className={cn('tarojs-table-wrapper', props.wrapperClassName)}
                >
                    {renderTable()}
                    <TableEmpty {...props.empty} />
                </View>
            </TableLoadingWrapper>
        );
    }

    return (
        <TableLoadingWrapper loading={props.loading}>
            <ScrollView
                enhanced
                bounces={false}
                id={ref.current.tableID}
                scrollX={Boolean(props.scroll?.x)}
                scrollY={Boolean(props.scroll?.y)}
                style={{ ...props.wrapperStyle, maxWidth: props.scroll?.x, maxHeight: props.scroll?.y }}
                className={cn('tarojs-table-wrapper', props.wrapperClassName)}
                onScroll={handleScroll}
                onScrollToLower={props.onScrollToLower}
                onScrollToUpper={props.onScrollToUpper}
            >
                {renderTable()}
            </ScrollView>
        </TableLoadingWrapper>
    );
};

export default Table;