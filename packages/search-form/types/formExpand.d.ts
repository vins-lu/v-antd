/// <reference types="react" />
interface FormExpandProps {
    expand: boolean;
    setExpand: (expand: boolean) => void;
}
declare type FormExpandTypes = (props: FormExpandProps) => JSX.Element;
declare const FormExpand: FormExpandTypes;
export default FormExpand;
