import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { IonApp, IonRouterContext, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useIonRouter } from "@ionic/react";

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
import '../theme/variables.css';

import Home from './tab1/Home';
import Login from './tab1/Login';
import Signup from './tab1/Signup';
import Scanner from './tab1/Scanner';
import { AuthContextProvider, useAuthState } from '../firebase';
import React from 'react';

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


const Tab1: React.FC = () => {

    return (
        <AuthContextProvider>
            <IonApp>
                <IonReactRouter>
                    <IonRouterOutlet>
                        <Switch>
                            <Route exact path="/home" component={Home} />
                            {/* <AuthenticatedRoute exact path="/home" component={Home} /> */}
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={Signup} />
                            <Route exact path="/home" component={Login} />
                            <Route exact path='/scanner' component={Scanner} />
                            <Route exact path="*" render={() => <Redirect to="/login" />} />
                        </Switch>
                    </IonRouterOutlet>
                </IonReactRouter>
            </IonApp>
        </AuthContextProvider>

    )
};

export default Tab1;

//good morning maam i have a college mock interview today evening so i'll have to leave today a bit early around 4pm