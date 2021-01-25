/// <reference types="react" />
import { SearchFormField } from './formFields';
export interface SearchFormGroup {
    groupName: string | JSX.Element;
    searchFormFields: SearchFormField[];
}
export interface MultiFormFieldsProps {
    searchFormGroups?: SearchFormGroup[];
    rows?: number;
    columns?: number;
}
declare type MultiFormFieldsTypes = (props: MultiFormFieldsProps) => JSX.Element[];
declare const MultiFormFields: MultiFormFieldsTypes;
export default MultiFormFields;
