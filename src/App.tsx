import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Scanner from './pages/tab1/Scanner';
import { AuthContextProvider, useAuthState } from './firebase';
import React from 'react';
import Tab1 from './pages/tab1/Tab1';
import { getAuth } from 'firebase/auth';
import Tab2 from './pages/tab2/Tab2';
import Tab3 from './pages/tab3/Tab3';




setupIonicReact();

interface AuthenticatedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState();
  return (
    <Route {...props} render={(routeProps) => isAuthenticated ? (<C {...routeProps} />) : (<Redirect to="/login" />)} />
  );
};


const App: React.FC = () => {

  return (
    <AuthContextProvider>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Switch>
              <Route exact path="/tab1" component={Tab1} />
              {/* <AuthenticatedRoute exact path="/home" component={Home} /> */}
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/home" component={Login} />
              <Route exact path='/tab1/scanner' component={Scanner} />
              {/* <Route exact path='/tab2' component={Tab2} /> */}
              {/* <Route exact path='/tab3' component={Tab3} /> */}
              <Route exact path="*" render={() => <Redirect to="/login" />} />
            </Switch>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </AuthContextProvider>
  )
};

export default App;
//how di add private routes to a react app that is using firebase as a backend
//how do i persist login state in a react app that is using firebase as a backend