/// <reference types="react" />
declare type ToolbarTypeEnum = ['refresh', 'density', 'expand', 'fullScreen', 'setting'][number];
declare type toolbarOption = {
    hide?: boolean;
    option?: Record<string, unknown>;
};
export declare type ToolBarProps = {
    [k in ToolbarTypeEnum]?: toolbarOption;
};
declare function ToolBar(props: ToolBarProps): JSX.Element;
export default ToolBar;
