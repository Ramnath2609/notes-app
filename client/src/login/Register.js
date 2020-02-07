import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-router-dom'

class Register extends React.Component {
    constructor() {
        super ()
        this.state = {
            username : '',
            email : '',
            password : '',
            error : {}
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
                console.log(response)
                if(response.data._id) {
                    console.log(this.props)
                    this.props.history.push('/users/login')
                } else {
                    const errors = response.data.errors
                    console.log({ [Object.keys(errors)[0]] : errors[Object.keys(errors)[0]].message })
                    console.log(Object.keys(errors)[0])
                    this.setState({ error : { [Object.keys(errors)[0]] : errors[Object.keys(errors)[0]].message } })
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
                    { this.state.error.username && 
                    <div className = "alert alert-danger" role = "alert">
                        Username should be atleast 5 characters long
                    </div>
                    }
                    <div className = "form-group">
                        <input type = "text" placeholder = "email" name = "email" className = "form-control" value = { this.state.email } onChange = { this.handleChange } />
                    </div>
                    { this.state.error.email && 
                    <div className = "alert alert-danger" role = "alert">
                        Invalid email
                    </div>
                    }
                    <div className = "form-group">
                        <input type = "password" placeholder = "password" name = "password" className = "form-control" value = { this.state.password } onChange = { this.handleChange } />
                    </div>
                    { this.state.error.password && 
                    <div className = "alert alert-danger" role = "alert">
                        Your password is too short
                    </div>
                    }
                    <button type = "submit" className = "btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default Register