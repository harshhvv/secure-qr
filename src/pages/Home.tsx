import { IonActionSheet, IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonChip, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { signOut, getAuth } from "firebase/auth";
import { useHistory } from 'react-router';
import { db } from '../firebase';
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import QRCode from 'react-qr-code';
import CryptoJS from 'crypto-js';
import './Home.css'
import { closeCircle, person } from 'ionicons/icons';


// const secret: any = import.meta.env.VITE_ENC_DEC_KEY;
const secret: any = "abcdefghijklmnopqrstuvwxyz1234567890"




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

  const auth = getAuth();
  const loggedInUser = auth.currentUser;

  const [firstName, setFirstName] = useState<string>("");


  const height = useRef<HTMLIonInputElement>(null) //keep track of height
  const weight = useRef<HTMLIonInputElement>(null) //keep track of weight
  const [bmi, setbmi] = useState<number>() //keep track of bmi
  const [qrdata, setqr] = useState<string>() //keep track of qr data

  let bmis2: any[] = []   //will hold bmi data from firestore
  let newJson: any[] = [] //will hold new bmi data to be pushed to firestore

  const showDisplayName = () => {
    useEffect(() => {
      setFirstName(loggedInUser?.displayName?.split(" ")[0] as string);
    }, []);
  }
  showDisplayName()
  // showDisplayName()
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
    const qrdata = CryptoJS.AES.encrypt(user!.uid, secret).toString(); //encrypt uid
    // console.log("encrypted uid is: " + qrdata)
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
            <IonBackButton>back</IonBackButton>
          </IonButtons> */}
          <IonTitle>BMI </IonTitle>

          <IonChip slot='end' id='open-action-sheet'>
            <IonActionSheet
              trigger="open-action-sheet"
              // header="Actions"
              mode='ios'
              buttons={[
                {
                  text: 'Logout',
                  role: 'destructive',
                  handler: () => {
                    handleLogout();
                  }
                },
                {
                  text: 'Scan QR',
                  handler: () => {
                    scanQr();
                  }
                },
                {
                  text: 'Cancel',
                  role: 'cancel',
                  data: {
                    action: 'cancel',
                  },
                },
              ]}
            ></IonActionSheet>
            <IonAvatar >
              <img id='user-avatar' src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
            <IonLabel id='user-firstname-label'>{firstName}</IonLabel>
          </IonChip>

        </IonToolbar>
      </IonHeader>

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
          </IonCardContent>
        </IonCard>
        <IonCard mode='ios'>
          <IonCardContent>
            <IonButton mode='ios' className='btn' onClick={calcBmiAndUpdateDoc}>Calculate BMI</IonButton>
            <IonButton mode='ios' className='btn' onClick={reset}>Reset</IonButton>
            {/* <IonButton mode='ios' className='btn' onClick={scanQr}>Scan</IonButton> */}
            {/* <IonButton mode='ios' className='btn' onClick={handleLogout}>Logout</IonButton> */}
          </IonCardContent>
        </IonCard >

        {bmi && <IonCard mode='ios'>
          <IonCardContent>
            <h2>{bmi}</h2>
          </IonCardContent>
        </IonCard>}

        {qrdata && <IonCard mode='ios'>
          <IonCardContent>
            <QRCode value={qrdata} />
          </IonCardContent>
        </IonCard>}

      </IonContent>
    </IonPage >
  );

};
export default Home;
