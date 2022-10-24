import clsx from 'clsx';

const FormField = ({
  onChange,
  value,
  label,
  labelIcon,
  name,
  id,
  type = 'text',
  autoComplete,
  className,
  ...props
}) => {
  return (
    <div className={clsx('formField', className)} {...props}>
      <label htmlFor={id}>
        {labelIcon}
        <span>{label}</span>
      </label>
      {type === 'textarea' ? (
        <textarea
          rows="2"
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
