import React from 'react';
import NotesList from '../src/notes/Notes'
import Login from '../src/login/Login'
import Register from '../src/login/Register'
import NewNote from '../src/notes/New'
import CategoryList from '../src/categories/Categories'
import NoteEdit from '../src/notes/Edit'
import NoteShow from '../src/notes/NoteShow'
import Home from '../src/Home'
import CategoryNew from '../src/categories/New'
import CategoryEdit from '../src/categories/Edit'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

function App() {
  const handleLogout = () => {
    localStorage.removeItem("authToken")
    window.location.href = "/account/login" // we cant access props within this component
  }
  return (
    <div>
      <BrowserRouter>
       {
          localStorage.getItem("authToken") ? (
            <div>
              <Link to = '/'> Home  |</Link>
              <Link to ="/notes">  Noteslist  |</Link>
              <Link to = '/notes/new'/>
              <Link to = '/notes/edit/:id' />
              <Link to = '/categories' >  Categories  |</Link>
              <Link to = "/users/logout" onClick = { handleLogout }>  Logout</Link>
            </div>
            
          ) : (
            <div>
              <Link to = "/">Home |</Link>
              <Link to ="/users/register">  Register  |</Link>
              <Link to ="/users/login"> Login |</Link>
            </div>
          )
       }
         
          <Switch>
            <Route exact path = '/' component = { Home } />
            <Route exact path = "/notes" component = { NotesList } />
            <Route path = '/notes/new' component = { NewNote }/>
            <Route path = '/notes/edit/:id' component = { NoteEdit } />
            <Route path = '/notes/:id' component = { NoteShow } />
            
            <Route path = "/users/register" component = { Register } />
            <Route path = "/users/login" component = { Login } />
            <Route exact path = '/categories' component = { CategoryList } />
            <Route path = '/categories/new' component = { CategoryNew } />
            <Route path = '/categories/edit/:id' component = { CategoryEdit } />
          </Switch>
          
      </BrowserRouter>
     
    </div>
  )
}


export default App;
