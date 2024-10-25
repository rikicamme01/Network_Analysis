import React, {Component} from "react";

export default function Message(props){
    if (props.name)
        return <h1>Hello {props.name}</h1>;
    return <h1>Hello World</h1>
}