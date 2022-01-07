import { getFirestore, collection } from 'firebase/firestore'

import app from './firebaseApp'

const db = getFirestore(app)

const CUsers = collection(db, 'user-props')

export { CUsers }
