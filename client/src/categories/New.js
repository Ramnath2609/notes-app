import React from 'react'
import axios from 'axios'

class CategoryNew extends React.Component {
    constructor () {
        super ()
        this.state = {
            category : ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const category = this.state.category
        const formData = {
            name : category
        }
        axios.post('http://localhost:3015/categories', formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
            .then(response => {
                console.log(response.data)
                if (response.data._id) {
                    this.props.history.push('/categories')
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    render () {
        return (
            <div className = "container" >
                <h2>Add a new category</h2>
                <form onSubmit = { this.handleSubmit }>
                    <div className = "form-group">
                        <input type="text" placeholder = "category name" className = "form-control" name="category" value= { this.state.category } onChange = { this.handleChange }/>
                    </div>
                    
                    <button type="submit" className = "btn btn-primary">Add</button>
                </form>
            </div>
        )
      
    }
}

export default CategoryNew