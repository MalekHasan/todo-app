import { useState, useEffect } from 'react';
import  './form.scss';



const useForm = (callback, defaultValues={}) => {

  const [values, setValues] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    localStorage.setItem("todos",JSON.stringify(values))

    callback(values);
  };

  const handleChange = (event) => {
    event.persist();

    let { name, value } = event.target;
    if (parseInt(value)) {
      value = parseInt(value);
    }

    setValues(values => ({ ...values, [name]: value }));
  };

  useEffect( () => {
    setValues( defaultValues );
  }, [defaultValues]);

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
