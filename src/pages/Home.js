import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers, updateUser } from '../store/actions';
import FormControls from '../components/FormControl';
import { Header } from '../components/Header';

import { FormItems, ButtonItem, PrograsBar, ShowResponse } from './HomeStyle';

const AddUser = () => {
  let dispatch = useDispatch();
  const { users = [], response, loading } = useSelector((state) => state.data);

  const [state, setState] = useState(users);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  useEffect(() => {
    setState(users);
  }, [users]);

  const handleSubmit = (e) => {
    const payload = {};
    for (let field of state) {
      payload[field.fieldName] = field.value;
    }
    dispatch(updateUser(payload));
  };

  const handleChange = (key, value) => {
    const updateState = [...state];
    for (let i = 0; i < updateState.length; i++) {
      if (updateState[i].fieldName === key) {
        updateState[i] = { ...updateState[i], value };
        break;
      }
    }
    setState(updateState);
  };
  return (
    <>
      <Header />
      <FormItems>
        <h3>Edit Form details:</h3>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '99%' } }}
        >
          {state &&
            state.map((user) => (
              <FormControls
                field={user}
                key={user.fieldName}
                onChange={handleChange}
              />
            ))}
          <ButtonItem>
            <Button variant="contained" onClick={handleSubmit} color="primary">
              Update
            </Button>
          </ButtonItem>
        </Box>

        {loading && (
          <PrograsBar>
            <CircularProgress />
          </PrograsBar>
        )}
      </FormItems>

      <ShowResponse>{response}</ShowResponse>
    </>
  );
};

export default AddUser;
