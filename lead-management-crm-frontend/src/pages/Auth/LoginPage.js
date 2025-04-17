import React from 'react';
import LoginForm from '../../components/Auth/LoginForm';
import Layout from '../../components/Layout/Layout';

const LoginPage = () => {
  return (
    <Layout>
      <div>
        <LoginForm />
      </div>
    </Layout>
  );
};

export default LoginPage;