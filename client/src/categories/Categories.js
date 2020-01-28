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
        axios.get('http://localhost:3015/categories')
            .then(response => {
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
            <div>
                <h2>List of categories - {this.state.categories.length } </h2>
                <ul>
                    {
                        this.state.categories.map(category => {
                            return <li key = {category._id}>{ category.name }<Link to ={`/categories/edit/${category._id}`}>Edit  |</Link><Link to = '/categories'onClick={() => {this.handleDelete(category._id)}}>Delete</Link></li>
                        })
                    }
                </ul>
                <button onClick ={ this.handleClick }>Add</button>
            </div>
        )
    }
}

export default CategoryList