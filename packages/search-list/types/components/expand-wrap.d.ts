import React from 'react';
export interface ExpandWrapProps {
    hideExpand?: boolean;
    maxHeight?: number | string;
    title?: React.ReactNode;
    children?: React.ReactNode;
    parentExpand?: boolean;
    toggleParentExpand?: (expand?: boolean) => void;
}
declare function ExpandWrap(props: ExpandWrapProps): JSX.Element;
export default ExpandWrap;
