import React from "react";
import './Bar.css';

class Bar extends React.Component {

    // props(length , color , isCurrentItem)

    render() {
        let background = this.props.isCurrentItem ? "red" : this.props.color;
        let barStyle = {
            height: this.props.length,
            background: background
        };

        return(
            <div className="bar" style={barStyle}/>
        );
    }
}

export default Bar;