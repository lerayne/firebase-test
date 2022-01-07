import {useState, useRef, useEffect} from 'react'
import {Provider, useDispatch, useSelector} from 'react-redux'
import {configureStore, createSlice} from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    name: null
  },
  reducers: {
    login: (state) => {
      state.name = 'Michael'
    },
    logout: state => {
      state.name = null
    }
  }
})

const store = configureStore({
  reducer: {
    user: user.reducer
  }
})

type RootState = ReturnType<typeof store.getState>

function Header() {
  console.log('render Header')

  const [color, setColor] = useState('black')

  const name = useSelector((state: RootState) => state.user.name)
  const dispatch = useDispatch()

  return <header>
    {!name && <button onClick={() => dispatch(user.actions.login())}>Sign in</button>}
    {!!name && <div>
      <span style={{color}}>Hello, {name}!</span>
      <button onClick={() => dispatch(user.actions.logout())}>Sign out</button>
      <button onClick={() => setColor('blue')}>go Blue</button>
    </div>}
  </header>
}

function Header2({user, onLogin, onLogout}) {
  console.log('render Header2')

  const [color, setColor] = useState('black')

  return <header>
    {!user && <button onClick={onLogin}>Sign in</button>}
    {!!user && <div>
      <span style={{color}}>Hello, {user}!</span>
      <button onClick={onLogout}>Sign out</button>
      <button onClick={() => setColor('blue')}>go Blue</button>
    </div>}
  </header>
}

function Content2() {
  console.log('render Content2')
  return <span>1111</span>
}

function Content() {
  console.log('render Content')
  return <div>Some other data: <Content2 /></div>
}


export default function RootComponent() {
  console.log('render RootComponent')

  //const items = useRef([1, 2, 3])

  const [stateItems, setStateItems] = useState([1, 2, 3])

  useEffect(() => {
    console.log('effect:', stateItems)
  }, [stateItems])

  return <div>
    <Provider store={store}>
      {/*<Header2
          user={this.state.user2}
          onLogin={() => this.setState({user2: 'Andrew'})}
          onLogout={() => this.setState({user2: null})}
        />*/}
      <Content />
      <ol>{stateItems.map(item => <li key={item}>{item}</li>)}</ol>
      <button
        onClick={() => {
          setStateItems(array => {
            array.push(array.length + 1)
            console.log('func', array)
            return [...array]
          })
        }}
      >add item
      </button>
    </Provider>
  </div>
}
