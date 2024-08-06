import React from "react";

import "./contentwrapper.scss";

const ContentsWrapper = ({ children }) => {
    return <div className="contentWrapper">{children}</div>;
};

export default ContentsWrapper;