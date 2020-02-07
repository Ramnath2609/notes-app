import React from 'react'
//import axios from 'axios'

class NoteForm extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            title : props.title ? props.title : '',
            description : props.description ? props.description : '',
            category : props.category ? props.category : '',
            categories : props.categories 
        }
    }

    // componentDidMount () {
    //     axios.get('http://localhost:3015/categories')
    //         .then(response => {
    //             const categories = response.data
    //             this.setState({ categories })
    //         })
    // }


    handleChange = (e) => {
        // this.setState({ [ e.target.name ] : e.target.value})
        // console.log(e.target.name)
            switch (e.target.name) {
              case 'photo':
                this.setState({ photo: e.target.files[0] });
                break;
              default:
                this.setState({ [e.target.name]: e.target.value });
            }
          
    }

    handleSelect = (e) => {
        console.log(e.target.value)
        this.setState({ category : e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const title = this.state.title
        const description = this.state.description
        const category = this.state.category
        const photo = this.state.photo
        const formData = {
            title,
            description,
            category, 
            photo
        }
        this.props.handleSubmit(formData)
    }

    render () {
        return (
            <div className = "container">
                  <form onSubmit = { this.handleSubmit }>
                    <div className = "form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className = "form-control" id = "title" name = "title" value= { this.state.title } onChange = { this.handleChange } />
                    </div>
                    <div className = "form-group">
                        <label htmlFor="description">description</label>
                        <input type="text" className = "form-control" name="description" id ="description" value={ this.state.description } onChange = { this.handleChange }/>
                    </div>
                    <div className = "form-group">
                        <select className = "form-control" onChange = { this.handleSelect }>
                            <option value="select" >Select</option>
                            {this.state.categories.length !== 0 &&
                                this.state.categories.map(category => {
                                    return <option name ="category" value= { category._id } key = { category._id } >{ category.name }</option>
                                })
                            }
                        </select>
                    </div>
                    <button type = "submit" className = "btn btn-primary">Create</button>
                </form>
            </div>
        )
    }
} 

export default NoteForm