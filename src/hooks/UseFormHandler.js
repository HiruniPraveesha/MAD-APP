import { useState } from 'react';

const useFormHandler = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = (rules) => {
    let isValid = true;
    const newErrors = {};

    Object.keys(rules).forEach((field) => {
      const value = values[field];
      const rule = rules[field];

      // Required field check
      if (rule.required && !value) {
        isValid = false;
        newErrors[field] = `${field} is required`;
        return;
      }

      // Minimum length check
      if (rule.minLength && value?.length < rule.minLength) {
        isValid = false;
        newErrors[field] = `${field} must be at least ${rule.minLength} characters`;
        return;
      }

<<<<<<< HEAD
      // Exact length check (e.g., phone number)
      if (rule.length && value?.length !== rule.length) {
        isValid = false;
        newErrors[field] = `${field} must be exactly ${rule.length} characters`;
        return;
      }

      // Email format check
      if (
        rule.email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
=======
      // Email format check
      if (rule.email && !/^\S+@\S+\.\S+$/.test(value)) {
>>>>>>> 7018f2bda7a4838a625b5d15f4c547c8290426af
        isValid = false;
        newErrors[field] = `Invalid email format`;
        return;
      }

<<<<<<< HEAD
      // Numeric check (e.g., phone number)
=======
      // Numeric check for mobile number
>>>>>>> 7018f2bda7a4838a625b5d15f4c547c8290426af
      if (rule.numeric && !/^\d+$/.test(value)) {
        isValid = false;
        newErrors[field] = `${field} must be numeric`;
        return;
      }

<<<<<<< HEAD
      // Password complexity check
      if (
        rule.passwordComplexity &&
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value)
      ) {
        isValid = false;
        newErrors[field] = `${field} must include uppercase, lowercase, numbers, and symbols`;
        return;
      }

      // Exact match check (e.g., password confirmation)
=======
      // Exact match check (e.g., for password confirmation)
>>>>>>> 7018f2bda7a4838a625b5d15f4c547c8290426af
      if (rule.match && value !== values[rule.match]) {
        isValid = false;
        newErrors[field] = `${field} does not match ${rule.match}`;
        return;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  return { values, errors, handleChange, validate };
};

export default useFormHandler;
