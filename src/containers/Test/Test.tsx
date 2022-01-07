import {useState, Component} from 'react'
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

function Header2({ user, onLogin, onLogout }) {
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

function Content2 () {
  console.log('render Content2')
  return <span>1111</span>
}

function Content() {
  console.log('render Content')
  return <div>Some other data: <Content2 /></div>
}


export default class RootComponent extends Component {
  state = {
    user2: null,
    testObject: {
      items: [1,2,3]
    }
  }

  render() {
    console.log('render RootComponent')

    return <div>
      <Provider store={store}>
        <Header2
          user={this.state.user2}
          onLogin={() => this.setState({user2: 'Andrew'})}
          onLogout={() => this.setState({user2: null})}
        />
        <Content />
        <ol>{this.state.testObject.items.map(item => <li key={item}>{item}</li>)}</ol>
        <button onClick={() => {
          this.state.testObject.items.push(this.state.testObject.items.length + 1)
          this.setState({ testObject: this.state.testObject })
        }}>add item</button>
      </Provider>
    </div>
  }
}
