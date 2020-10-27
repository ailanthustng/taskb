import React, {useState} from 'react';
import {Grommet, Box, DataTable, Text} from 'grommet';
import { grommet } from 'grommet/themes';
import "./contact-table.css";
import EditForm from "./EditForm";
import axios from 'axios';

const columns = [
    {
        property: 'name',
        header: <Text>Name</Text>,
        primary: true,
    },
    {
        property: 'gender',
        header: <Text>Gender</Text>,
    },
    {
        property: 'phone',
        header: <Text>Phone Number</Text>,
    },
    {
        property: 'email',
        header: <Text>Email</Text>,
    },
]

const ContactTable = ({contacts, setContacts}) => {
    const [open, setOpen] = useState(false);
    const [datum, setDatum] = useState({});
    const onOpen = (datum) => {
        setDatum(datum);
        console.log(datum);
        setOpen(true);
    }
    const onClose = () => setOpen(false);

    const handleUpdate = (name, gender, email, phone, id) => {
        axios.put(`http://localhost:8080/api/contacts/${id}`, 
          {
            name,
            gender,
            phone,
            email,
          }).then(res => console.log(res));
          setTimeout(window.location.reload(false), 1000)          
          onClose();
    }

    const onDeleteClick = (id) => {
        axios.delete(`http://localhost:8080/api/contacts/${id}`)
            .then(res => console.log(res));
        setContacts(contacts.filter(contact => contact._id != id));
        onClose();
    }

    return (
        <Grommet theme={grommet}>
            <Box align="center" pad="large">
                <DataTable
                    columns={columns.map(c => ({
                    ...c,
                    search: c.property === 'name'
                    ,
                    }))}
                    data={contacts}
                    sortable
                    resizeable
                    onClickRow={({datum}) => onOpen(datum)}
                />
                <EditForm open={open} handleClose={onClose} datum={datum} handleUpdate={handleUpdate} setContacts={setContacts} onDeleteClick={onDeleteClick}/>
            </Box>
        </Grommet>
    )
};

export default ContactTable;