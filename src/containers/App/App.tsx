import {FC, MouseEvent, useState} from 'react'
import {Auth, getAuth, GoogleAuthProvider, signInWithPopup, UserCredential} from 'firebase/auth'
import app from '../../firebaseApp'
import {CUsers} from '../../firestore'
import {addDoc, getDocs, query, where} from 'firebase/firestore'

import Test from '../Test'

const googleProv = new GoogleAuthProvider()
const auth: Auth = getAuth(app)

interface IUser {
  uid: string
  displayName: string,
  photoURL: string,
  email: string
}

interface IAppProps {
  testParam: any
}

interface IHeaderProps {
  readonly user: IUser
  readonly onLoginClick: (e: MouseEvent) => void
}


const Header: FC<IHeaderProps> = ({user, onLoginClick}) => {
  console.log('render Header')
  return <header>
    {!user && <>
      <button onClick={onLoginClick}>Sign in with Google</button>
    </>}

    {!!user && <div>
      <img src={user.photoURL} />
      <span>{user.displayName}</span>
    </div>}
  </header>
}

const App: FC<IAppProps> = () => {
  const [user, setUser] = useState<IUser>(null)

  async function popup() {
    const userInfo: UserCredential = await signInWithPopup(auth, googleProv)

    if (userInfo) {
      const {uid, displayName, photoURL, email} = userInfo?.user
      const newUser: IUser = {
        uid,
        displayName,
        photoURL,
        email
      }

      const userSnapshot = await getDocs(query(CUsers, where('uid', '==', uid)))

      if (userSnapshot.empty) {
        await addDoc(CUsers, newUser)
      }

      console.log('userSnapshot', userSnapshot)

      setUser(newUser)
    }
    console.log('userInfo', userInfo)
  }

  return <>
    {/*<Header user={user} onLoginClick={popup} />*/}
    <Test />
  </>
}

export default App