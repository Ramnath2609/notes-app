import React from 'react';
import NotesList from '../src/notes/Notes'
import NewNote from '../src/notes/New'
import CategoryList from '../src/categories/Categories'
import NoteEdit from '../src/notes/Edit'
import NoteShow from '../src/notes/NoteShow'
import Home from '../src/Home'
import CategoryNew from '../src/categories/New'
import CategoryEdit from '../src/categories/Edit'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

function App() {

  return (
    <div>
      <BrowserRouter>
          <Link to = '/'> Home  |</Link>
          <Link to ="/notes">  Noteslist  |</Link>
          <Link to = '/notes/new'/>
          <Link to = '/notes/edit/:id' />
          <Link to = '/categories' >  Categories</Link>
          <Switch>
            <Route exact path = '/' component = { Home } />
            <Route exact path = "/notes" component = { NotesList } />
            <Route path = '/notes/new' component = { NewNote }/>
            <Route path = '/notes/edit/:id' component = { NoteEdit } />
            <Route path = '/notes/:id' component = { NoteShow } />
            

            <Route exact path = '/categories' component = { CategoryList } />
            <Route path = '/categories/new' component = { CategoryNew } />
            <Route path = '/categories/edit/:id' component = { CategoryEdit } />
          </Switch>
          
      </BrowserRouter>
     
    </div>
  )
}


export default App;
