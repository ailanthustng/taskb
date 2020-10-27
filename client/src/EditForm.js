import React, {useEffect, useState} from 'react';
import {Close } from 'grommet-icons';
import { FormTrash, FormEdit } from 'grommet-icons';
import "./edit-form.css"

import {
  Box,
  Button,
  FormField,
  Heading,
  Layer,
  Select,
  TextInput,
  MaskedInput,
} from 'grommet';

const EditForm = ({open, handleClose, handleUpdate, datum, onDeleteClick}) => {

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [id, setID] = useState('');

  useEffect(() => {
    setName(datum.name);
    setGender(datum.gender);
    setPhone(datum.phone);
    setEmail(datum.email);
    setID(datum._id);
  }, [datum]);

  const onNameChange = event => {
    setName(event.target.value);
  };

  const onPhoneChange = event => {
    setPhone(event.target.value);
  };

  const onEmailChange = event => {
    setEmail(event.target.value);
  };

  const onSubmit = () => {
    handleUpdate(name, gender, email, phone, id);
  }

  const onDelete = () => {
    onDeleteClick(id);
  }

  return (
        open && (
          <Layer
            position="right"
            full="vertical"
            modal
            onClickOutside={handleClose}
            onEsc={handleClose}
          >
            <Box
              as="form"
              fill="vertical"
              overflow="auto"
              width="medium"
              pad="medium"
              onSubmit={handleClose}
            >
              <Box flex={false} direction="row" justify="between">
                <Heading level={2} margin="none">
                  Edit Contact
                </Heading>
                <Button icon={<Close />} onClick={handleClose} />
              </Box>
              <Box flex="grow" overflow="auto" pad={{ vertical: 'medium' }}>
                <FormField label="Name">
                  <TextInput 
                    placeholder={name}
                    value={name}
                    onChange={onNameChange}
                  />
                </FormField>
                <FormField label="Gender">
                  <Select
                    placeholder={gender}
                    options={[
                      'Male',
                      'Female',
                    ]}
                    value={gender}
                    onChange={({ option }) => setGender(option)}
                  />
                </FormField>
                <FormField label="Phone">
                  <MaskedInput
                      mask={[
                          {
                              length: 4,
                              regexp: /^[0-9]{1,4}$/,
                              placeholder: 'xxxx',
                          },
                          {
                              length: 4,
                              regexp: /^[0-9]{1,4}$/,
                              placeholder: 'xxxx',
                          },
                      ]}
                      value={phone}
                      onChange={onPhoneChange}
                      placeholder={phone}
                  />
                </FormField>
                <FormField label="Email">
                <TextInput 
                    placeholder={email}
                    value={email}
                    onChange={onEmailChange}
                  />
                </FormField>
              </Box>
              <Box flex={false} as="footer" justify="between">
                <Button color="status-error" label="Delete" icon={<FormTrash />} onClick={onDelete} className="delete-button"/>
                <Button primary type="submit" label="Edit" icon={<FormEdit />} onClick={onSubmit} />
              </Box>
            </Box>
          </Layer>
        )
  );
};

export default EditForm;