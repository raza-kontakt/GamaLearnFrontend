import { Navigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) return <Navigate to="/assessments" />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <LoginForm />
    </div>
  );
}
