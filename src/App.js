import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Components/Login';
import { RouterOutlined } from '@mui/icons-material';
import {AuthProvider} from './Context/AuthContext'
import Feed from './Components/Feed';
import PrivateRoute from './Components/PrivateRoute';


function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
      <Route path = '/login' element={<Login/>}></Route>
      <Route path = '/signup' element={<Signup/>}></Route>
      <Route exact path='/' element={<PrivateRoute/>}>
        <Route exact path='/' element={<Feed/>}/>
      </Route>
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
