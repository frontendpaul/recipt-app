import clsx from 'clsx';
import { useRef } from 'react';

const FormField = ({
  onChange,
  defaultValue,
  label,
  labelIcon,
  name,
  id,
  type = 'text',
  autoComplete,
  className,
  ...props
}) => {
  const ref = useRef(null);
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
          value={defaultValue}
          autoComplete={autoComplete}
          onChange={onChange}
        ></textarea>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={defaultValue}
          autoComplete={autoComplete}
          onChange={onChange}
        />
      )}
    </div>
  );
};
export default FormField;
