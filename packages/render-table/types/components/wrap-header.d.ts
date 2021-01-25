/// <reference types="react" />
import { TableWrapperProps } from '../table-wrapper';
declare type WrapHeaderProps = Omit<TableWrapperProps, 'locale' | 'minHeight' | 'cacheUserHabit' | 'children'>;
declare function WrapHeader(props: WrapHeaderProps): JSX.Element;
export default WrapHeader;
