/** 
 * @typedef Contact
 * @type {object}
 * @property {string} id id contact 
  * @property {string} name name contact
  * @property {string} phone phone contact
*/

/** @type {Contact[]} */
let contacts = [];


/**  
  * Agrega un contacto.
  * @param {Contact} newContact New Contact
 */
const addContact = (newContact) => {
      contacts = contacts.concat(newContact);
  };

 /** Guarda los contactos en el navegador */ 
const saveInBrowser = () => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };

const editIconDisabled = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>            
`

const editIconEnabled = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>
`;

/** Renderiza los contactos en el HTML
 * @param {Element} list La lista a la cual se van a agregar los contactos en el HTML
 */
const renderContacts = (list) => {
  // Borrar todo el html del ul para empezar desde 0
list.innerHTML = '';
contacts.forEach(contact => {
  // 1. Crear el elemento li
  const li = document.createElement('li');
  // 2. Agregarle la clase
  li.classList.add('contacts-list-item');
  // Agregarle la id al li
  li.id = contact.id;
  li.setAttribute('status', 'inputs-deshabilitados')
  // 3. Crear el elemento en si
  const inputsContainerDiv = `
    <div class="inputs-container">
      <input class="contacts-list-item-name-input" type="text" value="${contact.name} " readonly>
      <input class="contacts-list-item-phone-input" type="text" value="${contact.phone}" readonly>
    </div>
  `;
  const editBtn = `
    <button class="edit-btn">
      ${editIconDisabled}           
    </button>
  `;
  const deleteBtn = `
    <button class="delete-btn">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
  `;
  const btnsContainerDiv = `
    <div class="btns-container">
      ${editBtn}
      ${deleteBtn}
    </div>
  `;
  li.innerHTML = `
    ${inputsContainerDiv}
    ${btnsContainerDiv}
  `;
  // 4. Agregar a la lista
  list.append(li);
});
};

/**  Obtiene los contactos del navegador */
const getContactsFromLocalStorage = () => {
  const contactsLocalStorage = localStorage.getItem('contacts');
  contacts = JSON.parse(contactsLocalStorage) ?? [];
}

/** 
 * Elimina un contacto
 * @param {string} id Id contact to eliminate
 */
const removeContact = (id) => {
  contacts = contacts.filter(contact => contact.id !== id);
}

/**
 * Actualiza un contacto
 * @param {Contact} updatedContact
 */
const updateContact = (updateContact) => {
  contacts = contacts.map(contact => {
    if(contact.id === updateContact.id) {
      return updateContact
    } else {
      return contact;
    }
  })
}


export {addContact, saveInBrowser, renderContacts, getContactsFromLocalStorage, removeContact, updateContact,editIconDisabled, editIconEnabled};