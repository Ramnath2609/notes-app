import React from 'react'
import { connect } from 'react-redux'

function ShowCategory(props) {
    return (
        <div>
            <h1>Showing category</h1>
        </div>
    )
}

export default connect()(ShowCategory)