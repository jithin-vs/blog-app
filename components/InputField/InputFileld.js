import styles from './inputField.module.css';

const InputField = ({ label, type, name, id }) => {
    return (
      <span className={styles.inputSpan}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <input type={type} name={name} id={id} />
      </span>
    );
};
  
export default InputField;