/// <reference types="react" />
export interface SearchFormField {
    name: string;
    label: string;
    renderElement: JSX.Element | (() => JSX.Element);
}
export interface FormFieldsProps {
    searchFormFields?: SearchFormField[];
    rows?: number;
    columns?: number;
    expand?: boolean;
}
declare type FormFieldsTypes = (props: FormFieldsProps) => JSX.Element[];
declare const FormFields: FormFieldsTypes;
export default FormFields;
