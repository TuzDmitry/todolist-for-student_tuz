import React from "react";
import preloader from '../src/assets/images/preloader.gif'

const Preloader = (props) => {
    return (
        props.isPreloader&&<div>
            <img src={preloader} alt=""/>
        </div>
    )
}

export default Preloader;