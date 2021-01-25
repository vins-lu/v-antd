/// <reference types="react" />
import { RenderFormProps } from '@vins-rc/render-form';
interface SearchFormProps extends RenderFormProps {
    hideExpand?: boolean;
    maxHeight?: number | string;
    groupMaxHeight?: number | string;
}
declare function SearchForm(props: SearchFormProps): JSX.Element;
export default SearchForm;
