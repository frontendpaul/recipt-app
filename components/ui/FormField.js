const FormField = ({
  onChange,
  value,
  label,
  labelIcon,
  name,
  id,
  type = 'text',
  autoComplete,
  ...props
}) => {
  return (
    <div className="formField">
      <label htmlFor={id}>
        {labelIcon}
        <span>{label}</span>
      </label>
      {type === 'textarea' ? (
        <textarea
          rows="4"
          id={id}
          name={name}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={onChange}
        ></textarea>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={onChange}
        />
      )}
    </div>
  );
};
export default FormField;
