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
        isValid = false;
        newErrors[field] = `Invalid email format`;
        return;
      }

      // Numeric check (e.g., phone number)
      if (rule.numeric && !/^\d+$/.test(value)) {
        isValid = false;
        newErrors[field] = `${field} must be numeric`;
        return;
      }

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