import React from 'react'
import axios from 'axios'

class CategoryEdit extends React.Component {
    constructor () {
        super ()
        this.state = {
            category : ''
        }
    }

    componentDidMount () {
        const id = this.props.match.params.id
        axios.get(`http://localhost:3015/categories/${id}`)
            .then(response => {
                if (response.data._id){
                    const category = response.data
                    this.setState({ category })
                }
                
            })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault ()
        const name = this.state.category
        const formData = {
            name
        }
        const id = this.props.match.params.id
        console.log(id)
        axios.put(`http://localhost:3015/categories/${id}`, formData)
            .then(response => {
                if(response.data._id) {
                    this.props.history.push('/categories')
                }
            })
    }

    render () {
        if (this.state.category.length === 0 ) {
            return (
                <div>
                    <h2>Edit category</h2>
                </div>
            )
        } else {
            return (
                <div className = "container">
                    <h2>Edit category</h2>
                    <form onSubmit = { this.handleSubmit }>
                        <div className = "form-group">
                        <label htmlFor = "category">Name </label>
                            <input type="text" id="category" className = "form-control" name="category" value={ this.state.category.name } onChange = { this.handleChange }/>
                        </div>
                        <button type = "submit" className = "btn btn-primary">Add</button>
                    </form>
                </div>
            )
        }
        
        
    }
}

export default CategoryEdit