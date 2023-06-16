import { IonApp, IonAvatar, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow } from "@ionic/react";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import "./tab3.css"


const Tab3 = () => {
    const [dpURL, setDpURL] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const auth = getAuth();
    const loggedInUser = auth.currentUser;
    const showDp = () => {
        useEffect(() => {
            setDpURL(loggedInUser?.photoURL as string);
        }, []);
    }

    const showFirstName = () => {
        useEffect(() => {
            setFirstName(loggedInUser?.displayName?.split(" ")[0] as string);
        }, []);
    }

    const showLastName = () => {
        useEffect(() => {
            setLastName(loggedInUser?.displayName?.split(" ")[1] == null ? "" : loggedInUser?.displayName?.split(" ")[1] as string);
        }, []);
    }


    const showEmail = () => {
        useEffect(() => {
            setEmail(loggedInUser?.email as string);
        }, []);
    }


    showDp();
    showFirstName();
    showLastName();
    showEmail();
    // console.log(loggedInUser)

    return (
        <IonApp>
            <IonPage>

                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol></IonCol>
                            <IonCol>
                                <IonAvatar id="profile-pic">
                                    <IonImg src={dpURL} >pls</IonImg>
                                </IonAvatar>
                            </IonCol>
                            <IonCol></IonCol>

                        </IonRow>
                    </IonGrid>

                    <IonCard id="trial">

                        <IonCardContent>


                            <IonItem id="first-name-item">
                                <IonLabel position="floating">First Name</IonLabel>
                                <IonInput value={firstName} readonly></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Last Name</IonLabel>
                                <IonInput value={lastName} readonly></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonLabel position="floating">Email </IonLabel>
                                <IonInput value={email} readonly></IonInput>
                            </IonItem>

                        </IonCardContent>
                    </IonCard>
                </IonContent>
            </IonPage>
        </IonApp >
    )
}
export default Tab3;