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
        axios.get('http://localhost:3015/notes')
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
            <div>
                <h2>Listing notes - { this.state.notes.length }</h2>
                <ul>
                    {
                        this.state.notes.map(note => {
                            return <li key = {note._id}>{ note.title }<Link to = {`/notes/${note._id}`}>Show  |</Link></li>
                        })
                    }
                </ul>
                <button onClick = { this.handleClick }>Create a new note</button>
            </div>
        )
    }
}

export default NotesList