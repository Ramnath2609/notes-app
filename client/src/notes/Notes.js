import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


class NotesList extends React.Component {
    constructor () {
        super ()
        this.state = {
            notes : [],
            note : {}
        }
    }

    componentDidMount () {
        axios.get('http://localhost:3015/notes',{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const notes = response.data
                this.setState({
                    notes
                })
            })
    }

    handleClick = () => {
        this.props.history.push('/notes/new')
    }

   

    render () {
        return (
            <div className = "container" style = {{width : '750px'}}>
                <h2>Listing notes - { this.state.notes.length }</h2>
                <ul className = "list-group">
                    {
                        this.state.notes.map(note => {
                            return <li className = "list-group-item" key = {note._id}>{ note.title }<Link to = {`/notes/${note._id}`}>  Show  |</Link></li>
                        })
                    }
                </ul><br/>
                <button onClick = { this.handleClick } className = "btn btn-primary">Create a new note</button>
            </div>
        )
    }
}

export default NotesList