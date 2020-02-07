import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class CategoryList extends React.Component {
    constructor () {
        super () 
        this.state = {
            categories : []
        }
    }

    componentDidMount () {
        axios.get('http://localhost:3015/categories',{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
            .then(response => {
                console.log(response)
                const categories = response.data
                this.setState({ categories })
            })
    }

    handleClick = () => {
        this.props.history.push('/categories/new')
    }

    handleDelete = (id) => {
        console.log(id)
        axios.delete(`http://localhost:3015/categories/${id}`)
            .then(response => {
                if (response.data._id) {
                    window.location.reload()
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    render () {
        return (
            <div className = "container" style = {{width : '750px'}}>
                <h2>List of categories - {this.state.categories.length } </h2>
                <ul className = "list-group">
                    { this.state.categories.length !== 0 &&
                        this.state.categories.map(category => {
                            return <li className = "list-group-item" key = {category._id}>{ category.name }<Link to ={`/categories/edit/${category._id}`}>  Edit  |</Link><Link to = '/categories'onClick={() => {this.handleDelete(category._id)}}>  Delete</Link></li>
                        })
                    }
                </ul><br/>
                <button className = "btn btn-primary" onClick ={ this.handleClick }>Add</button>
            </div>
        )
    }
}

export default CategoryList