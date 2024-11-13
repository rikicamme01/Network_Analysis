import React from "react";
import { Link } from "react-router-dom";
//import { KeyFill } from "../../components/KeyFill";
//import { UserFill } from "../../components/UserFill";
//import "./style.css";

export default function Login() {
  return (
    <div className="login">
      <div className="div-2">
        <div className="overlap-group-2">
          <Link className="div-wrapper" to="/newu95ass">
            <div className="text-wrapper-6">Login</div>
          </Link>

          <img
            className="group-2"
            alt="Group"
            src="https://cdn.animaapp.com/projects/66feabcefe03384e24c11e1d/releases/66feb1ab5b92b75df4d9829f/img/group-8703.png"
          />

          <div className="frame-2">
            <UserFill className="design-component-instance-node" />
            <input className="input" />
          </div>

          <div className="frame-3">
            <KeyFill className="design-component-instance-node" />
            <input className="input" />
          </div>

          <img
            className="ML-FCARIPLO-nero"
            alt="Ml FCARIPLO nero"
            src="https://cdn.animaapp.com/projects/66feabcefe03384e24c11e1d/releases/6713e7c1d35889107e5a9a6b/img/ml-fcariplo-nero--base-100mm-1.png"
          />

          <div className="text-wrapper-7">con il supporto di</div>
        </div>

        <img
          className="dialogica-logo-lab-2"
          alt="Dialogica logo lab"
          src="https://cdn.animaapp.com/projects/66feabcefe03384e24c11e1d/releases/66feb1ab5b92b75df4d9829f/img/dialogica-logo-lab-1.png"
        />
      </div>
    </div>
  );
};
