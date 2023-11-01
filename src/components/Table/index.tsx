import * as React from 'react';
import cn from 'classnames';
import { View, ScrollView, BaseEventOrigFunction, ScrollViewProps, CommonEventFunction } from '@tarojs/components';

interface BaseRowProps {
    /** 行样式 */
    className?: string;
    /** 行内联样式 */
    style?: React.CSSProperties;
    /** 点击行 */
    onTap?: CommonEventFunction;
}

export interface TableColumnProps {
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
    /** 自定义渲染内容 */
    render?: (value: any, record: any, index: number) => React.ReactNode;
}

export interface TableProps {
    id?: string;
    /** 表格列 */
    columns: TableColumnProps[];
    /** 表格数据 */
    dataSource: any[];
    /** 样式 */
    className?: string;
    /** 内联样式 */
    style?: React.CSSProperties;
    /** Table 最外层的包裹容器（scroll-view）样式名 */
    wrapperClassName?: string;
    /** Table 最外层的包裹容器（scroll-view）内联样式 */
    wrapperStyle?: React.CSSProperties;
    /** 唯一标识 */
    rowKey?: string;
    /** 高度 */
    height?: number;
    /** 滚动
     * @description — x: 容器宽度，内容宽度超过容器宽度时滚动
     * @description — y: 容器高度，内容高度超过容器高度时滚动
     */
    scroll?: { x?: number | string, y?: number | string };
    /** 行属性 */
    onRow?: (record: any, index: number) => BaseRowProps;
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

interface TableRowProps extends BaseRowProps {
    rowIndex: number;
    rowData: any;
    columns: TableColumnProps[];
    fixedLeftCols: FixedColsProps[];
    fixedRightCols: FixedColsProps[];
}

interface TableColGroupProps {
    columns: TableColumnProps[];
}

interface FixedColsProps {
    index: number;
    left?: number;
    right?: number;
    width: number;
    lastLeft?: boolean;
    firstRight?: boolean;
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
                            [`tarojs-table-align-${col.align}`]: Boolean(col.align)
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
    const ref = React.useRef({ tableID: props.id || `_${Array.from({ length: 4 }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('')}` });
    const [fixedLeftCols, setFixedLeftCols] = React.useState<FixedColsProps[]>([]);
    const [fixedRightCols, setFixedRightCols] = React.useState<FixedColsProps[]>([]);

    (function () {
        const fixedCount = props.columns.filter(col => col.fixed).length;
        const fixedWidthCount = props.columns.filter(col => col.fixed && col.width && col.width > 0).length;

        if (fixedCount !== fixedWidthCount) {
            throw new Error('固定列缺少列宽，请给需要固定的列指定列宽');
        }
    })()

    /** 计算每个固定列的贴边位置 */
    React.useEffect(() => {
        const fixedLeftCols: FixedColsProps[] = [];
        const fixedRightCols: FixedColsProps[] = [];
        let left = 0;
        let right = props.columns.reduce((sum, col) => sum + (col.fixed === 'right' ? (col.width || 0) : 0), 0);

        props.columns.forEach((col, index) => {
            if (col.fixed === 'left') {
                if (fixedLeftCols.length > 0) {
                    fixedLeftCols[fixedLeftCols.length - 1].lastLeft = false;
                }

                fixedLeftCols.push({ index, left, width: col.width || 0, lastLeft: true });
                left = left + (col.width || 0);
            } else if (col.fixed === 'right') {
                right = right - (col.width || 0);
                fixedRightCols.push({ index: index, right, width: col.width || 0, firstRight: fixedRightCols.length === 0 });
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
    }, [
        ...props.columns.map((col) => col.fixed),
        ...props.columns.map((col) => col.width),
    ]);

    /** 渲染表头 */
    const renderTableHeader = () => {
        return (
            <View className="tarojs-table-row">
                {props.columns.map((col, index) => {
                    const fixedLeftCol = fixedLeftCols.find(m => m.index === index);
                    const fixedRightCol = fixedRightCols.find(m => m.index === index);
                    const left = fixedLeftCol?.left;
                    const right = fixedRightCol?.right;

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
                            {col.title}
                        </View>
                    );
                })}
            </View>
        );
    };

    /** 渲染表格数据 */
    const renderTableBody = () => {
        return props.dataSource.map((record, index) => {
            const rowKey = props.rowKey && record[props.rowKey] || index.toString();

            return (
                <TableRow
                    key={rowKey}
                    rowData={record}
                    rowIndex={index}
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

    return (
        <ScrollView
            enhanced
            bounces={false}
            id={ref.current.tableID}
            scrollX={Boolean(props.scroll?.x)}
            scrollY={Boolean(props.scroll?.y)}
            style={{ ...props.wrapperStyle, maxWidth: props.scroll?.x, maxHeight: props.scroll?.y }}
            className={cn('tarojs-table-wrapper', props.wrapperClassName)}
            onScroll={props.onScroll}
            onScrollToLower={props.onScrollToLower}
            onScrollToUpper={props.onScrollToUpper}
        >
            {renderTable()}
        </ScrollView>
    );
};

export default Table;