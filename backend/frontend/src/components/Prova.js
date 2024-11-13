import React, { useState } from 'react';
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { Person, Lock } from 'react-bootstrap-icons';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logica per gestire il login
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
      <h2 className="text-center">Login</h2>
      <Form onSubmit={handleSubmit}>
        {/* Campo per il Username con icona */}
        <InputGroup className="mb-3">
          <InputGroup.Text><Person /></InputGroup.Text>
          <FormControl
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </InputGroup>

        {/* Campo per la Password con icona */}
        <InputGroup className="mb-3">
          <InputGroup.Text><Lock /></InputGroup.Text>
          <FormControl
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputGroup>

        {/* Pulsante di login */}
        <Button variant="primary" type="submit" block>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
