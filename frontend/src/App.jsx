import { useState, useEffect } from 'react'
import ContactList from './component/contactList'
import ContactForm from './component/contactForm'
import './App.css'

function App() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsmodalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts")
    const data = await response.json()
    setContacts(data.contacts)
    // console.log(data.contacts)
  }

  // To open modal
  const closeModal = () => {
    setIsmodalOpen(false)
    setCurrentContact({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsmodalOpen(true)
  }

  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsmodalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  return (
    <div className='p-[2rem]'>
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}/>
      <button className='mt-6 border-[0.2rem] border-slate-300 rounded-lg px-4 py-1.5' onClick={openCreateModal}>Create new contact</button>
      {
        isModalOpen &&
        <div className='modal'>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
          </div>
        </div>
      }
    </div>
  )
}

export default App
