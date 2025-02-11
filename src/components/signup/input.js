function Input(props) {
    return ( <div>
                <input
                    type={props.type}
                    placeholder={props.placeholder}
                    {...props.register}
                />
                {props.error && <span className="error-message">{props.error.message}</span>}
            </div> );
}

export default Input;