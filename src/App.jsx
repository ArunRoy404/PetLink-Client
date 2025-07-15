import React from 'react';
import ThemeToggle from './components/ui/ThemeToggle';
import { useAuthContext } from './context/AuthContext';

const App = () => {

  const {firebaseUser} = useAuthContext()
  console.log(firebaseUser);
  
  return (
    <div className='bg-background text-text w-[100vw] h-[100vh]'>
      <ThemeToggle />
    </div>
  );
};

export default App;