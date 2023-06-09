import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useRef, useState } from 'react';
import { signOut, getAuth } from "firebase/auth";
import { useHistory } from 'react-router';
import { db } from '../firebase';
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import QRCode from 'react-qr-code';
import CryptoJS from 'crypto-js';
const auth = getAuth();
// const secret: any = process.env.REACT_APP_SECRET;
const secret: any = "abcdefghijklmnopqrstuvwxyz1234567890";



const Home: any = () => {

  const history = useHistory();
  const handleLogout = () => {
    signOut(auth).then(() => {
      history.goBack();
      console.log("Signed out successfully")
    }).catch((error) => {
      alert(error.message)
    });
  }

  const height = useRef<HTMLIonInputElement>(null)
  const weight = useRef<HTMLIonInputElement>(null)
  const [bmi, setbmi] = useState<number>()
  const [qrdata, setqr] = useState<string>()

  let bmis2: any[] = []
  let newJson: any[] = []

  const calcBmiAndUpdateDoc = async () => {
    const user = auth.currentUser
    const enteredHeight = height.current!.value;
    const enteredWeight = weight.current!.value;

    if (!enteredHeight || !enteredWeight) {
      return;
    }
    const bmi = +enteredWeight / (+enteredHeight * +enteredHeight);
    setbmi(bmi)

    const docSnap = await getDoc(doc(db, "data", user!.uid));
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      bmis2 = docSnap.data()!.bmis
      // console.log(bmis2)
      newJson = [...bmis2]
      // console.log("old" + newJson as string)
      const date = new Date();
      newJson.push({
        bmi: bmi.toFixed(2),
        height: +enteredHeight,
        weight: +enteredWeight,
        date: String(date.getDate()).padStart(2, '0') + "/" + String(date.getMonth() + 1).padStart(2, '0') + "/" + date.getFullYear()
        // Date().toString().slice(4, 16)
      })
      console.log(JSON.stringify(newJson))

      await updateDoc(doc(db, "data", user!.uid), {
        bmis: newJson
      });
    }
    const qrdata = CryptoJS.AES.encrypt(user!.uid, secret).toString();
    console.log("encrypted uid is: " + qrdata)
    setqr(qrdata)
  }

  const scanQr = () => {
    history.push("/scanner")
  }

  const reset = () => {
    height.current!.value = '';
    weight.current!.value = '';
  }

  return (
    <IonPage className='ok'>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle >BMI Calc</IonTitle>
          <IonLabel></IonLabel>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        <IonCard>
          <IonCardContent>
            <IonItem className="inputs">
              <IonLabel position='floating'>Your weight in kg</IonLabel>
              <IonInput ref={weight}></IonInput>
            </IonItem>


            <IonItem className="inputs">
              <IonLabel position='floating'>Your height in meters</IonLabel>
              <IonInput ref={height}></IonInput>
            </IonItem>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <IonButton className='btn' onClick={calcBmiAndUpdateDoc}>Calculate BMI</IonButton>
            <IonButton className='btn' onClick={reset}>Reset</IonButton> <br />
            <br />
            <IonButton onClick={handleLogout}>Logout</IonButton>
            <br />
            <IonButton onClick={scanQr}>Scan</IonButton>
          </IonCardContent>
        </IonCard>

        {bmi && <IonCard>
          <IonCardContent>
            <h2>{bmi}</h2>
          </IonCardContent>
        </IonCard>}

        {qrdata && <IonCard>
          <IonCardContent>
            <QRCode value={qrdata} />
          </IonCardContent>
        </IonCard>}
      </IonContent>

      {/* <IonFab slot='fixed' vertical='bottom' horizontal='center'>
        <IonFabButton onClick={startScan}>
          <IonIcon icon={camera}></IonIcon>
        </IonFabButton>
      </IonFab> */}

    </IonPage >
  );

};

export default Home;
