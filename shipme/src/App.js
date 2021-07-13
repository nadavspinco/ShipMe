import logo from './logo.svg';
import './App.css';
import SignUp from './signup';
import SignIn from './SignIn';
import {useSelector,connect} from 'react-redux'
import Cookies from 'js-cookie'
import {Route,Switch,useHistory} from 'react-router-dom'
import AppPage from './AppPage'
function App() {

 let {jwt,user,showSignUpState}  = useSelector(state => state);
 jwt = Cookies.get('jwt');

 const histoy = useHistory();
  return (
    <div className="App">
    <Switch>
      <Route exact path='/signin'>
      {jwt? (() =>histoy.push('/')):<SignIn/> }

      </Route>
      <Route path='/signup'>
      {jwt ? (() =>histoy.push('/')):<SignUp/> }
      </Route>
      <Route path='/'>
      {!jwt? (() =>histoy.push('/signup')):<AppPage/> }
      </Route>
      </Switch>
    </div>
  );
}


// function mapStateToProps(state, ownProps) {
//   return {
//       jwt: state.jwt,
//   };
// }

//export default connect(mapStateToProps)(App)
export default (App)
// </Switch>
    //    {!jwt? (showSignUpState ? (<SignIn/>) : <SignUp/>):<p>logged in</p> }