import { IonApp, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { triangle, square, ellipse } from "ionicons/icons";
import { Route, Redirect, Switch } from "react-router";
import Tab2 from "../tab2/Tab2";
import Tab3 from "../tab3/Tab3";
import Home from "./Home";



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
                                <Tab2 />
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
                            <IonIcon aria-hidden="true" icon={triangle} />
                            <IonLabel>Tab 1</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab2" href="/tab2">
                            <IonIcon aria-hidden="true" icon={ellipse} />
                            <IonLabel>Tab 2</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab3" href="/tab3">
                            <IonIcon aria-hidden="true" icon={square} />
                            <IonLabel>Tab 3</IonLabel>
                        </IonTabButton>
                    </IonTabBar>


                </IonTabs>
            </IonReactRouter>
        </IonApp>
    )
}

export default Tab1;