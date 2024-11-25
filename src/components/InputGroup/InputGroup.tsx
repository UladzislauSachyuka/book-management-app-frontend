import { ChangeEvent } from 'react';
import { Input } from '../../types';
import styles from './InputGroup.module.css';

const InputGroup: React.FC<Input> = ({ id, type, labelText, onChange, value, className }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id}>
        <span>{labelText}</span>
      </label>
      <input type={type} id={id} onChange={handleChange} value={value} autoComplete="off" className={className} />
    </div>
  );
};

export default InputGroup;
