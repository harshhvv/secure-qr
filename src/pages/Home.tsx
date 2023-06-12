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

  const loggedInUser = auth.currentUser;
  const firstName = loggedInUser?.displayName?.split(" ")[0];
  console.log(firstName)
  const height = useRef<HTMLIonInputElement>(null) //keep track of height
  const weight = useRef<HTMLIonInputElement>(null) //keep track of weight
  const [bmi, setbmi] = useState<number>() //keep track of bmi
  const [qrdata, setqr] = useState<string>() //keep track of qr data

  let bmis2: any[] = []   //will hold bmi data from firestore
  let newJson: any[] = [] //will hold new bmi data to be pushed to firestore

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
      console.log(JSON.stringify(newJson))

      await updateDoc(doc(db, "data", user!.uid), {
        bmis: newJson
      }); //update bmi data in firestore
    }
    const qrdata = CryptoJS.AES.encrypt(user!.uid, secret).toString(); //encrypt uid
    console.log("encrypted uid is: " + qrdata)
    setqr(qrdata)
  }

  const scanQr = () => {
    history.push("/scanner") //redirect to scanner page
  }

  const reset = () => {
    height.current!.value = '';
    weight.current!.value = '';
  }

  return (
    <IonPage className='ok'>
      <IonHeader>
        <IonToolbar>
          {/* <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle >BMI Calc</IonTitle> */}
          {/* <IonLabel >hello</IonLabel> */}
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
    </IonPage >
  );

};
export default Home;
