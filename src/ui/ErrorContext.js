// ErrorContext.js
import React from 'react';

const ErrorContext = React.createContext({
    errorMsg: null,
    setErrorMsg: () => {},
    errMsgTransformed: '',
    setErrMsgTransformed: () => {},
});

export default ErrorContext;