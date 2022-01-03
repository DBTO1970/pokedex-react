import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route  } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import AppNavigator from './components/AppNavigator'
import Favorites from './containers/Favorites'
import Pokedex from './containers/Pokedex'
import PokemonDetails from './containers/PokemonDetails'
import { store, persistor } from './redux/store'

export default function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Router>
      <AppNavigator />
        <Route exact path="/" component={Pokedex} />
        <Route exact path="/pokemon/:id" component={PokemonDetails} />
        <Route exact path="/favorites" component={Favorites} />
      </Router>
      
    </PersistGate>
    </Provider>
  )
}


