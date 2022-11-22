import React from "react";
import { useState } from "react";

const FormTodo = props =>{
    const [description, setDescription] = useState("")
    return (
        <form action="">
            <div className="todo-list">
                <div className="input">
                    <input type="text" className="text" value={description} />

                </div>

            </div>
        </form>
    )
}

export default FormTodo