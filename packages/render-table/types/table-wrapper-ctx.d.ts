import React from 'react';
import { DefaultColumnType, extendColumnType } from './table-wrapper';
import { DensitySize } from './components/density';
export interface TableWrapperCtxProps<CT extends DefaultColumnType = DefaultColumnType> {
    columns?: CT[];
    updateColumns?: (fn?: (columns: CT[]) => CT[]) => void;
    tableSize?: DensitySize;
    setTableSize?: (key: DensitySize) => void;
    expand?: boolean;
    toggleExpand?: () => void;
    refresh?: (resolve?: (arg?: unknown) => void) => void;
    fullscreen?: boolean;
    toggleFullscreen?: () => void;
    updateShowColumns?: (list: Array<extendColumnType['dataIndexFlat']>) => void;
    clearUserHabit?: () => void;
}
declare const TableWrapperCtx: React.Context<Pick<TableWrapperCtxProps<DefaultColumnType<unknown>>, "refresh" | "columns" | "updateColumns" | "tableSize" | "setTableSize" | "expand" | "toggleExpand" | "fullscreen" | "toggleFullscreen" | "updateShowColumns" | "clearUserHabit">>;
export default TableWrapperCtx;
