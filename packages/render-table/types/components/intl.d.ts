import React from 'react';
export interface IntlType {
    locale: string;
    getMessage: (id: string, defaultMessage: string) => string;
}
declare const createIntl: (locale: string, localeMap: {
    [key: string]: any;
}) => IntlType;
declare const zhCNIntl: IntlType;
declare const enUSIntl: IntlType;
export { zhCNIntl, enUSIntl };
declare const IntlContext: React.Context<IntlType>;
declare const IntlConsumer: React.Consumer<IntlType>, IntlProvider: React.Provider<IntlType>;
export { IntlConsumer, IntlProvider, createIntl };
export declare function useIntl(): IntlType;
export default IntlContext;
