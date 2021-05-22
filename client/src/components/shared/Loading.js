import React, { Component } from 'react'
import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";

const override = css`

`;

export default class loading extends Component {

    render() {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 200,
                alignItems: "center"
            }}>
                <CircleLoader color="#32be8f" loading={true} css={override} size={150} />
            </div>
        )
    }
}
