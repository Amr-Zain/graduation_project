function Input({ type, id, name, value, checked, handleChange, label }) {
    return (
        <div>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={handleChange}
                aria-label={label}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}
export default Input