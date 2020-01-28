import React from 'react'
import axios from 'axios'
import NoteForm from '../notes/Form'

class NewNote extends React.Component {
    constructor () {
        super ()
        this.state = {
            title : '',
            description : '',
            categories : [], 
            category : '',
            photo : ''
        }
    }

    
    componentDidMount () {
        axios.get('http://localhost:3015/categories')
            .then(response => {
                const categories = response.data
                this.setState({ categories })
            })
    }

    handleSubmit = (formData) => {
        //e.preventDefault()
        //console.log(formData)
        axios.post('http://localhost:3015/notes', formData, {
            'content-type': 'multipart/form-data'
        })
            .then(response => {
                console.log(response)
                if (response.data._id) {
                    this.props.history.push('/notes')
                } else {
                    console.log(response.data.message)
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    render () {
        if (this.state.categories.length === 0) {
            return (
                <div>
                    <h2>Add a new note</h2>
                </div>
            )
        }else {
            return (
                <div>
                  <h2>Add a new note</h2>
                  <NoteForm handleSubmit = { this.handleSubmit } { ...this.state }/>
                </div>
            )
        }
      
    }
}

export default NewNote