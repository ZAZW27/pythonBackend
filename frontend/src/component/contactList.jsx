import React from "react";  

const ContactList = ({ contacts, updateContact, updateCallback }) => {
    const tableHeadData = "font-bold pr-4 text-center"
    const tableBodyData = "font-thin pr-4"

    const onDelete = async (id) => {
        try{
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options);
            if (response.status === 200) {
                updateCallback()
            }else{
                console.error("failed to delete")
            }
        } catch (error){
            alert(error)
        }
    }

    return(
        <div>
            <h2 className="text-4xl font-extrabold">Contacts</h2>
            <table className="mt-8 ml-4">
                <thead>
                    <tr>
                        <td className={`${tableHeadData}`}>No.</td>
                        <td className={`${tableHeadData}`}>First name</td>
                        <td className={`${tableHeadData}`}>Last name</td>
                        <td className={`${tableHeadData}`}>Email</td>
                        <td className={`${tableHeadData}`}>Phone Number</td>
                        <td className={`${tableHeadData}`}>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td className={`${tableBodyData}`}>{contact.id}</td>
                            <td className={`${tableBodyData}`}>{contact.firstName}</td>
                            <td className={`${tableBodyData}`}>{contact.lastName}</td>
                            <td className={`${tableBodyData}`}>{contact.email}</td>
                            <td className={`${tableBodyData}`}>{contact.phoneNumber}</td>
                            <td className={`${tableBodyData}`}>
                                <button onClick={() => updateContact(contact)} className="mx-1.5 w-14 rounded-sm text-lime-500 font-bold">Edit</button>
                                <button onClick={() => onDelete(contact.id)} className="mx-1.5 w-14 rounded-sm text-red-500 font-bold">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ContactList