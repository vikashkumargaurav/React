import React from 'react';
import {Helmet} from "react-helmet";
import {APP_NAME} from "../../utils/constant";

const Head = ({title}) => {
    return (
        <Helmet>
            <meta charSet="utf-8"/>
            <title>{title || APP_NAME}</title>
        </Helmet>
    );
};

export default Head;