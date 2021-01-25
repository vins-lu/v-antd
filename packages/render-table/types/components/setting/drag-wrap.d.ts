/// <reference types="react" />
import { columnFixedType } from './setting-menu-item';
interface dragColumnOption {
    dataIndexFlat?: string;
    index?: number;
    fixed?: columnFixedType;
}
export interface DragWrapProps {
    onDrop?: (drag?: dragColumnOption, drop?: dragColumnOption) => void;
    children?: JSX.Element;
}
declare function DragWrap(props: DragWrapProps): JSX.Element;
export default DragWrap;
