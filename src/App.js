import {   Suspense, useEffect  } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./features/authedUser";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authedUser); 
  
useEffect(()=>{
  const token = localStorage.getItem('token'); 
  const refreshToken = localStorage.getItem('refreshToken'); 
  console.log('app')
  if (token && Object.keys(user).length === 0) { 
      dispatch(getUserData({token, refreshToken}))
  } 
},[dispatch, user])

  return(<Suspense fallback={<h3>Loading</h3>}>
          <RouterProvider router={router} />
        </Suspense>  );
}

export default App;
