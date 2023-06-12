import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { IonItem, IonLabel, IonInput, IonPage, IonContent, IonButton, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from "@ionic/react"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';

const Signup: React.FC = () => {
    const history = useHistory();
    const firstName = useRef<HTMLIonInputElement>(null)
    const lastName = useRef<HTMLIonInputElement>(null)
    const phoneNumber = useRef<HTMLIonInputElement>(null)
    const email = useRef<HTMLIonInputElement>(null)
    const password = useRef<HTMLIonInputElement>(null)


    const onSubmit = async (e: any) => {
        e.preventDefault()
        const enteredFirstName = (firstName.current!.value as string).trim();
        const enteredLastName = (lastName.current!.value as string).trim();
        const enteredPhoneNumber = (phoneNumber.current!.value as string).trim();
        const enteredEmail = email.current!.value as string;
        const enteredPassword = password.current!.value as string;
        if (!enteredEmail || !enteredPassword) { return; }
        await createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
            .then((userCredential) => {
                history.push('/home');
                const user = userCredential.user;
                console.log(user);
                const uid = user.uid;
                setDoc(doc(db, "users", uid), { //create a new document in firestore))
                    firstName: enteredFirstName,
                    lastName: enteredLastName,
                    phoneNumber: enteredPhoneNumber,
                    email: enteredEmail,
                    uid: uid
                })
                setDoc(doc(db, "data", uid), { //create a new document in firestore
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
                    <IonLabel position='floating'>First Name</IonLabel>
                    <IonInput ref={firstName} required></IonInput>
                </IonItem>

                <IonItem className="inputs">
                    <IonLabel position='floating'>Last Name</IonLabel>
                    <IonInput ref={lastName}></IonInput>
                </IonItem>
                <IonItem className="inputs">
                    <IonLabel position='floating'>Phone Number</IonLabel>
                    <IonInput ref={phoneNumber} type='number'></IonInput>
                </IonItem>
                <IonItem className="inputs">
                    <IonLabel position='floating'>Email</IonLabel>
                    <IonInput ref={email}></IonInput>
                </IonItem>

                <IonItem className="inputs">
                    <IonLabel position='floating'>Password</IonLabel>
                    <IonInput type="password" ref={password}></IonInput>
                </IonItem>
                <IonButton onClick={onSubmit}>Sign up</IonButton>
                <IonButton onClick={history.goBack}>Have an account? Login</IonButton>
            </IonContent>
        </IonPage>
    )
}


export default Signup