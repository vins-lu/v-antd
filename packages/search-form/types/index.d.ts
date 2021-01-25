/// <reference types="react" />
import Form, { FormProps, FormInstance } from 'antd/sun/dist/hook-form';
import { ButtonsCompProps } from './buttons';
import { FormFieldsProps } from './formFields';
import { MultiFormFieldsProps } from './multiFormFields';
interface SearchFormProps extends ButtonsCompProps, FormFieldsProps, MultiFormFieldsProps, FormProps {
    multiple?: boolean;
    onFinish(formData: object, ifFetchData?: boolean): void;
    form?: FormInstance;
}
export interface SearchFormTypes {
    (props: SearchFormProps): JSX.Element;
    useForm?: () => [FormInstance];
    Item?: Form['Item'];
}
declare const SearchForm: SearchFormTypes;
export default SearchForm;
