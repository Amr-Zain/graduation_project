


function Input(props) {
    return (
                <div className={ props.className }>
                    <input 
                        type = { props.type } 
                        id= { props.id } 
                        name= { props.name } 
                        value= { props.value }
                        checked = { props.checked === props.value }
                        onChange={ props.handleChange }
                    />
                    <label htmlFor= {props.id}>{String(props.id).charAt(0).toUpperCase()+ String(props.id).slice(1)}</label>
                </div>

            );
}

export default Input;