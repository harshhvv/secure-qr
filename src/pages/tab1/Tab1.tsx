import { IonApp, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { home, qrCodeOutline, person } from "ionicons/icons";
import { Route, Redirect, Switch } from "react-router";
import Tab3 from "../tab3/Tab3";
import Home from "./Home";
import Scanner from "./Scanner";



const Tab1 = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Switch>
                            <Route exact path="/tab1">
                                <Home />
                            </Route>
                            <Route exact path="/tab2">
                                <Scanner />
                            </Route>
                            <Route path="/tab3">
                                <Tab3 />
                            </Route>
                            <Route exact path="/">
                                <Redirect to="/tab1" />
                            </Route>
                        </Switch>
                    </IonRouterOutlet>


                    <IonTabBar slot="bottom">
                        <IonTabButton tab="tab1" href="/tab1">
                            <IonIcon aria-hidden="true" icon={home} />
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab2" href="/tab2">
                            <IonIcon aria-hidden="true" icon={qrCodeOutline} />
                            <IonLabel>Scan QR</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab3" href="/tab3">
                            <IonIcon aria-hidden="true" icon={person} />
                            <IonLabel>Profile</IonLabel>
                        </IonTabButton>
                    </IonTabBar>


                </IonTabs>
            </IonReactRouter>
        </IonApp>
    )
}

export default Tab1;