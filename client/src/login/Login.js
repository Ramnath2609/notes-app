import React from 'react'
import axios from 'axios'


class Login extends React.Component {
    constructor() {
        super ()
        this.state = {
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
            email : this.state.email,
            password : this.state.password
        }
        axios.post('http://localhost:3015/users/login', formData)
            .then(response => {
                console.log(response)
                if(response.data.token) {
                    const token = response.data.token
                    localStorage.setItem("authToken", token)
                    this.props.history.push("/")
                    window.location.reload()          

                } else {
                    alert(response.data.err)
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
                        <input type = "text" placeholder = "email" name = "email" className = "form-control" value = { this.state.email } onChange = { this.handleChange } />
                    </div>
                    <div className = "form-group">
                        <input type = "password" placeholder = "password" name = "password" className = "form-control" value = { this.state.password } onChange = { this.handleChange } />
                    </div>
                    <button type = "submit" className = "btn btn-primary" >Submit</button>
                </form>
            </div>
        )
    }
}

export default Login