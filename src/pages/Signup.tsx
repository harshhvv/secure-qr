import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { IonItem, IonLabel, IonInput, IonPage, IonContent, IonButton, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from "@ionic/react"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';

const Signup: React.FC = () => {
    const history = useHistory();
    const email = useRef<HTMLIonInputElement>(null)
    const password = useRef<HTMLIonInputElement>(null)

    const onSubmit = async (e: any) => {
        e.preventDefault()
        const enteredEmail = email.current!.value as string;
        const enteredPassword = password.current!.value as string;
        if (!enteredEmail || !enteredPassword) { return; }
        await createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
            .then((userCredential) => {
                history.push('/home');
                const user = userCredential.user;
                console.log(user);
                const uid = user.uid;
                setDoc(doc(db, "data", uid), {
                    bmis: [{
                        bmi: 0,
                        height: +0,
                        weight: +0,
                        date: 0
                    }]
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert(error.message)
            });


    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    {/* <IonTitle>Back Button</IonTitle> */}
                    <IonTitle>Signup Page</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem className="inputs">
                    <IonLabel position='floating'>Username</IonLabel>
                    <IonInput ref={email}></IonInput>
                </IonItem>

                <IonItem className="inputs">
                    <IonLabel position='floating'>Password</IonLabel>
                    <IonInput type="password" ref={password}></IonInput>
                </IonItem>
                <IonButton onClick={onSubmit}>Sign up</IonButton>
            </IonContent>
        </IonPage>
    )
}


export default Signup