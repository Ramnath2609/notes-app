import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-router-dom'

class Register extends React.Component {
    constructor() {
        super ()
        this.state = {
            username : '',
            email : '',
            password : ''
        }
    }

    handleChange = (e) => {
        this.setState( { [e.target.name] : e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = { 
            username : this.state.username,
            email : this.state.email,
            password : this.state.password
        }
        axios.post('http://localhost:3015/users/register', formData)
            .then(response => {
                if(response.data._id) {
                    console.log(this.props)
                    this.props.history.push('/users/login')
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    render () {
        return (
            <div className = "container">
                <h1>Register with us</h1>
                <form onSubmit = { this.handleSubmit }>
                    <div className = "form-group">
                        <input type = "text" placeholder = "username" name = "username" className = "form-control" value = { this.state.username } onChange = { this.handleChange } />
                    </div>
                    <div className = "form-group">
                        <input type = "text" placeholder = "email" name = "email" className = "form-control" value = { this.state.email } onChange = { this.handleChange } />
                    </div>
                    <div className = "form-group">
                        <input type = "password" placeholder = "password" name = "password" className = "form-control" value = { this.state.password } onChange = { this.handleChange } />
                    </div>
                    <button type = "submit" className = "btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default Register