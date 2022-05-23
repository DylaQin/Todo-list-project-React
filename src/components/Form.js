import React from "react";
import '../index.css';

export default function Form(props){
    
    const [name, setName] = React.useState('');
    
    function handleChange(e){
        setName(e.target.value);
    }

    function handleSubmit(e) {
        //console.log()
        e.preventDefault(); //prevent default 
        props.addTask(name);
        setName("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    What needs to be done?
                </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    )
}