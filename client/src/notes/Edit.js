import React from 'react'
import axios from 'axios'
import NoteForm from './Form'

class NoteEdit extends React.Component {
    constructor () {
        super ()
        this.state = {
           note : {},
           categories : []
        }
    }

    componentDidMount () {
        console.log('component did mount')
        const id = this.props.match.params.id
        console.log(id)
        const req1 = axios.get('http://localhost:3015/categories',{ headers : { 'x-auth' : localStorage.getItem('authToken')}})
        const req2 = axios.get(`http://localhost:3015/notes/${id}`, { headers : { 'x-auth' : localStorage.getItem('authToken')}} )
        Promise.all([req1, req2])
            .then(responses => {
                
                    const categories = responses[0].data
                    const note = responses[1].data
                    console.log(responses)
                    this.setState({ note, categories })
                
            })
            .catch(err => {
                alert(err)
            })
    }

    handleSubmit = (formData) => {
        //e.preventDefault()
        //console.log(formData)
        const id = this.props.match.params.id
        axios.put(`http://localhost:3015/notes/${id}`, formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
            .then(response => {
                console.log(response)
                if (response.data._id) {
                    this.props.history.push('/notes')
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    render () {
        if (this.state.note.title === undefined) {
            console.log('within if')
            return (
                <div>
                    <h1>Edit note</h1>
                </div>
            )
        }else {
            console.log('wihtin else')
            return (
                <div>
                    <h2>Edit note</h2>
                    <NoteForm handleSubmit = { this.handleSubmit } {...this.state.note } categories = { this.state.categories } />
                </div>
            )
        }
        
    }
}


export default NoteEdit