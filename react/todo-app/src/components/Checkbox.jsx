import React, {Fragment} from "react";

const Checkbox = (props) =>{
    const {onChange,
    data: {id, description, done}} = props

    return (<Fragment>
        <label htmlFor="" className="todo new-item">
            <input type="checkbox" className="todo_state" name={id} defaultChecked={done} onChange={onChange} />
            <div className="todo_text">{description}</div>
        </label>
    </Fragment>)
}

export default Checkbox