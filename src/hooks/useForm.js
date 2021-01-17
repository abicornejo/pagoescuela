import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [dataSelected, setDataSelected] = useState(initialState);

  const reset = () => {
    setDataSelected(initialState);
  };

  const onInputChange = ({ target }) => {
    setDataSelected({
      ...dataSelected,
      [target.name]: target.value || '',
    });
  };

  return { dataSelected, setDataSelected, onInputChange, reset };
};
