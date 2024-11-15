import React, { useState } from 'react';
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { Person, Lock } from 'react-bootstrap-icons';

function LoginForm() {
    return(
        <div className="input-group mb-3">
        <span className="input-group-text">
          <i className="bi bi-person-circle"></i> {/* Icona di Bootstrap */}
        </span>
        <input type="text" className="form-control" placeholder="Username" />
      </div>
    );
}

export default LoginForm;
