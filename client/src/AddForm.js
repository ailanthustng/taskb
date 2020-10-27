import React, {useState} from 'react';
import {Close } from 'grommet-icons';

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

const AddForm = ({open, onClose, handleSubmit}) => {

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

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
    handleSubmit(name, gender, email, phone);
  }

  return (
        open && (
          <Layer
            position="right"
            full="vertical"
            modal
            onClickOutside={onClose}
            onEsc={onClose}
          >
            <Box
              as="form"
              fill="vertical"
              overflow="auto"
              width="medium"
              pad="medium"
              onSubmit={onSubmit}
            >
              <Box flex={false} direction="row" justify="between">
                <Heading level={2} margin="none">
                  Add Contact
                </Heading>
                <Button icon={<Close />} onClick={onClose} />
              </Box>
              <Box flex="grow" overflow="auto" pad={{ vertical: 'medium' }}>
                <FormField label="Name">
                  <TextInput 
                    placeholder="Input name"
                    value={name}
                    onChange={onNameChange}
                  />
                </FormField>
                <FormField label="Gender">
                  <Select
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
                />
                </FormField>
                <FormField label="Email">
                <TextInput 
                    placeholder="Input email"
                    value={email}
                    onChange={onEmailChange}
                  />
                </FormField>
              </Box>
              <Box flex={false} as="footer" align="end">
                <Button
                  type="submit"
                  label="Submit"
                  onClick={onSubmit}
                  primary
                />
              </Box>
            </Box>
          </Layer>
        )
  );
};

export default AddForm;