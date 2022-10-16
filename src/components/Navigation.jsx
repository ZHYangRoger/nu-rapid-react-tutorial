//import { NavLink } from 'react-router-dom';
import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';
import './Navigation.css';

const SignInButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signInWithGoogle}>Sign in</button>
);

const SignOutButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signOut}>Sign out</button>
);

const AuthButton = () => {
  const [user] = useAuthState();
  return user ? <SignOutButton /> : <SignInButton />;
};

//const activation = ({isActive}) => isActive ? 'active' : 'inactive';

const Navigation = ({title}) => (
  <nav className="d-flex">
    <h1>{title}</h1>
    <AuthButton />
  </nav>
);

export default Navigation;