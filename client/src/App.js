import React, {useState, useEffect} from 'react';
import { Grommet, Main, Header, Button, Box, Clock } from 'grommet';
import { Add } from 'grommet-icons';
import "./App.css";
import axios from "axios";
import moment from "moment";
import ContactTable from "./ContactTable";
import AddForm from "./AddForm";

function App() {
  const [contacts, setContacts] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:8080/api/contacts/')
      .then(res => {console.log(res.data.data); setContacts(res.data.data)})
  }, []);

  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const handleSubmit = (name, gender, email, phone) => {
    axios.post('http://localhost:8080/api/contacts/', 
      {
        name,
        gender,
        phone,
        email,
      }).then(res => console.log(res));

    const newContact = {name, gender, phone, email};
    setContacts(contacts => [...contacts, newContact]);
    onClose();
  }

  return (
    <Grommet>
      <Header className="header" background="brand">
        <span>Contact Book 101</span>
        <Button primary label="Add Contact" icon={<Add />} onClick={onOpen}/>
      </Header>
      <Box className="clock-wrapper">
        <div className="date-clock">
          <span>{moment().format("DD / MM / YY")}</span>
        </div>
        <Clock className="date-clock" type="digital" />
      </Box>
      <Main>
        {
          contacts
          &&
          <ContactTable contacts={contacts} setContacts={setContacts}/>
        }
      </Main>
      <AddForm open={open} onClose={onClose} handleSubmit={handleSubmit}/>
    </Grommet>
  );
}

export default App;
