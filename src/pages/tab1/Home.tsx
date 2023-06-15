import { IonActionSheet, IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonPopover, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { signOut, getAuth } from "firebase/auth";
import { useHistory } from 'react-router';
import { db } from '../../firebase';
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import QRCode from 'react-qr-code';
import CryptoJS from 'crypto-js';
import './Home.css'
import { closeCircle, person } from 'ionicons/icons';
const secret: any = import.meta.env.VITE_ENC_DEC_KEY;




const Home: any = () => {

  const history = useHistory();
  const auth = getAuth();
  const loggedInUser = auth.currentUser;
  const [firstName, setFirstName] = useState<string>("");
  const height = useRef<HTMLIonInputElement>(null) //keep track of height, user input
  const weight = useRef<HTMLIonInputElement>(null) //keep track of weight, user input
  const [bmi, setbmi] = useState<number>() //keep track of bmi
  const [qrdata, setqr] = useState<string>() //keep track of qr data
  let bmis2: any[] = []   //will hold bmi data from firestore
  let newJson: any[] = [] //will hold new bmi data to be pushed to firestore

  const showDisplayName = () => {
    useEffect(() => {
      setFirstName(loggedInUser?.displayName?.split(" ")[0] as string);
      const qrdata = CryptoJS.AES.encrypt(loggedInUser!.uid, secret).toString(); //encrypt uid
      // console.log("encrypted uid is: " + qrdata)
      setqr(qrdata)
    }, []);
  }

  const handleLogout = () => {
    signOut(auth).then(() => {
      history.goBack();
      console.log("Signed out successfully")
    }).catch((error) => {
      console.log(error)
      alert("There was a problem logging out, please try again.")
    });
  }

  const showQR = () => {
    useEffect(() => {
      const qrdata = CryptoJS.AES.encrypt(loggedInUser!.uid, secret).toString(); //encrypt uid
      setqr(qrdata)
    }, []);
  }
  showDisplayName();
  showQR();

  const calcBmiAndUpdateDoc = async () => {
    const user = auth.currentUser
    const enteredHeight = height.current!.value;
    const enteredWeight = weight.current!.value;

    if (!enteredHeight || !enteredWeight) {
      return;
    }
    const bmi = +enteredWeight / (+enteredHeight * +enteredHeight);
    setbmi(bmi) //set bmi state

    const docSnap = await getDoc(doc(db, "data", user!.uid)); //get bmi data from firestore
    if (docSnap.exists()) {
      bmis2 = docSnap.data()!.bmis //store bmi data in bmis2
      newJson = [...bmis2] //copy bmis2 to newJson
      const date = new Date();
      newJson.push({
        bmi: bmi.toFixed(2),
        height: +enteredHeight,
        weight: +enteredWeight,
        date: String(date.getDate()).padStart(2, '0') + "/" + String(date.getMonth() + 1).padStart(2, '0') + "/" + date.getFullYear()
      })
      // console.log(JSON.stringify(newJson))

      await updateDoc(doc(db, "data", user!.uid), {
        bmis: newJson
      }); //update bmi data in firestore
    }
  }

  const scanQr = () => {
    history.push("/tab1/scanner") //redirect to scanner page
  }

  const showProfile = () => {
    history.push("/tab3") //redirect to profile page
  }

  const reset = () => {
    height.current!.value = '';
    weight.current!.value = '';
  }

  return (
    <IonPage>
      <IonToolbar>

        {loggedInUser && <IonChip slot='end' id='bottom-start'>
          <IonPopover trigger="bottom-start" side="bottom" alignment="center" mode='ios'>
            <IonContent class="ion-padding">
              <IonLabel mode='ios' className='popover-label' onClick={scanQr}>Scan QR</IonLabel>
              <IonLabel mode='ios' className='popover-label' onClick={showProfile}>Profile</IonLabel>
              <IonLabel mode='ios' className='popover-label' id="logout-btn" onClick={handleLogout}>Logout</IonLabel>
            </IonContent>
          </IonPopover>
          <IonAvatar >
            <img id='user-avatar' src="https://ionicframework.com/docs/img/demos/avatar.svg" />
          </IonAvatar>
          <IonLabel id='user-firstname-label'>{firstName}</IonLabel>
        </IonChip>}

      </IonToolbar>

      <IonContent>
        <IonCard mode='ios'>
          <IonCardContent>
            <IonItem className="inputs">
              <IonLabel position='floating'>Your weight in kg</IonLabel>
              <IonInput ref={weight}></IonInput>
            </IonItem>

            <IonItem className="inputs">
              <IonLabel position='floating'>Your height in meters</IonLabel>
              <IonInput ref={height}></IonInput>
            </IonItem>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton mode='ios' className='btn' onClick={calcBmiAndUpdateDoc}>Calculate BMI</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton mode='ios' className='btn' onClick={reset}>Reset</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard >

        {bmi && <IonCard mode='ios'>
          <IonCardContent>
            <h2>{bmi}</h2>
          </IonCardContent>
        </IonCard>}


        {qrdata && <IonCard mode='ios' id='QRCard' >
          <IonCardContent>
            <QRCode value={qrdata} id='QRCode' />
          </IonCardContent>
        </IonCard>}

      </IonContent>
    </IonPage >
  );

};
export default Home;
