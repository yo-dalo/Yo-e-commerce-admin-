import Msg from './common/Massage/Msg';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
//import { Page } from '../Page.config'; 
import { Page } from './Page.config_v2.tsx'; 
import { toast } from 'react-toastify';


import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';

import ECommerce from './pages/Dashboard/ECommerce';

import Settings from './pages/Settings';

import DefaultLayout from './layout/DefaultLayout';



function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
    <Msg />
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />
        
     
        
        
        {Page?.map((element,index)=>(
          element?.map((element_,index_)=>(
           <Route
          path={element_?.path}
          element={
            <>
              <PageTitle title={element_?.title||""} />
              {element_?.page }
            </>
          }
        />
            ))
        ))}
        
        
        
        
        
        
        
        
        

        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />

        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />


            <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
    
      </Routes>
    </DefaultLayout>
    

    </>
  );
}

export default App;
