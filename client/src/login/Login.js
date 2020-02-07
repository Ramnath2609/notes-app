import React from 'react'
import axios from 'axios'
import validator from 'validator'

class Login extends React.Component {
    constructor() {
        super ()
        this.state = {
            input : '',
            password : '',
            error : ''
        }
    }

    handleChange = (e) => {

        this.setState( { [e.target.name] : e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let formData
        if(validator.isEmail(this.state.input)) {
            formData = { 
                email : this.state.input,
                password : this.state.password
            }
        } else {
            formData = { 
                username : this.state.input,
                password : this.state.password
            }
        }
        
        console.log(formData)
        axios.post('http://localhost:3015/users/login', formData)
            .then(response => {
                console.log(response)
                if(response.data.token) {
                    const token = response.data.token
                    localStorage.setItem("authToken", token)
                    this.props.history.push("/")
                    window.location.reload()          

                } else {
                    console.log(response.data)
                    this.setState({ error : response.data.err })
                }
                
            })
            .catch(err => {
                alert(err)
            })
    }

    render () {
        return (
            <div className = "container">
                <h1>Login</h1>
                <form onSubmit = { this.handleSubmit }>
                    <div className = "form-group">
                        <input type = "text" placeholder = "email or username" name = "input" className = "form-control" value = { this.state.input } onChange = { this.handleChange } />
                    </div>
                    <div className = "form-group">
                        <input type = "password" placeholder = "password" name = "password" className = "form-control" value = { this.state.password } onChange = { this.handleChange } />
                    </div>
                    { this.state.error.length !== 0 && 
                    <div className = "alert alert-danger" role = "alert">
                        { this.state.error }
                    </div>
                    }
                    <button type = "submit" className = "btn btn-primary" >Submit</button>
                </form>
               
            </div>
        )
    }
}

export default Login