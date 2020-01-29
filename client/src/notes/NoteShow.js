import React from 'react'
import axios from'axios'


class NoteShow extends React.Component {
    constructor () {
        super ()
        this.state = {
            note : {}
        }
    }

    componentDidMount () {
        const id = this.props.match.params.id
        axios.get(`http://localhost:3015/notes/${id}`)
            .then(response => {
                const note = response.data
                console.log(note)
                this.setState({ note })
            })
    }

    handleClick = () => {
        const id = this.props.match.params.id
        axios.delete(`http://localhost:3015/notes/${id}`)
            .then(response => {
                if (response.data._id) {
                    this.props.history.push('/notes')
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    handleEdit = () => {
        const id = this.props.match.params.id
        console.log(id)
        this.props.history.push(`/notes/edit/${id}`)
    }

    render () {
        return (
            <div className = "container jumbotron">
                <h2>Showing post</h2>
                <h3>{ this.state.note.title }</h3>
                <p><em>Description :</em>{ this.state.note.description }</p>
                {/*<p><em>Category :</em>{Object.keys(this.state.note).length === 0 ? '' : this.state.note.category.name } </p>*/}
                <button className = "btn btn-danger" onClick ={ this.handleClick }>Delete</button>
                <button className = "btn btn-primary" onClick = { this.handleEdit }>Edit</button>
            </div>
        )
    }
}

export default NoteShow