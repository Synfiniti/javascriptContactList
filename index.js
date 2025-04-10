import * as Contacts from "./contacts.js";

// Selectores
const inputName = document.querySelector("#name-input");
const inputNumber = document.querySelector("#phone-input");
const form = document.querySelector("#main-form");
const formBtn = document.querySelector("#main-form-btn");
const contactBtn = document.querySelector("#contact-edit-btn");
const contactsList = document.querySelector("#contacts-list");
const inputNameEdit = document.querySelector(".contacts-list-item-name-input");
const inputPhoneEdit = document.querySelector(
  ".contacts-list-item-phone-input"
);

// Regex
const NAME_REGEX = /^[A-Z][a-z]*[ ][A-Z][a-z]{3,}[ ]{0,1}$/;
const PHONE_REGEX = /^[0](412|424|414|426|416|212)[0-9]{7}$/;

// Validaciones del formulario
let nameValidation = false;
let phoneValidation = false;

// Funciones
const renderValidation = (input, validation) => {
  const helperText = input.nextElementSibling;
  if (input.value === "") {
    input.classList.remove("input-invalid");
    input.classList.remove("input-valid");
    helperText?.classList.remove("show-helper-text");
  } else if (validation) {
    input.classList.add("input-valid");
    input.classList.remove("input-invalid");
    helperText?.classList.remove("show-helper-text");
  } else {
    input.classList.add("input-invalid");
    input.classList.remove("input-valid");
    helperText?.classList.add("show-helper-text");
  }
};

const renderButtonState = () => {
  if (nameValidation && phoneValidation) {
    formBtn.disabled = false;
  } else {
    formBtn.disabled = true;
  }
};

// Eventos
inputName.addEventListener("input", (e) => {
  nameValidation = NAME_REGEX.test(inputName.value);
  renderValidation(inputName, nameValidation);
  renderButtonState();
});

inputNumber.addEventListener("input", (e) => {
  phoneValidation = PHONE_REGEX.test(inputNumber.value);
  renderValidation(inputNumber, phoneValidation);
  renderButtonState();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // 1. Validar
  if (!nameValidation || !phoneValidation) return;
  // 2. Obtener el numero y el nombre.
  const phone = inputNumber.value;
  const name = inputName.value;
  // 3. Asignar un id. Ramdom
  const id = crypto.randomUUID();
  // 4. Estructurar el contacto
  const newContact = { id, name, phone };
  // 5. Agregar al array de contactos
  Contacts.addContact(newContact);
  // 6. Guardar en el navegador
  Contacts.saveInBrowser();
  // 7. Renderizar en el navegador
  Contacts.renderContacts(contactsList);
  Contacts.saveInBrowser();
});

contactsList.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-btn");
  const editBtn = e.target.closest(".edit-btn");
  if (deleteBtn) {
    const li = deleteBtn.parentElement.parentElement;
    Contacts.removeContact(li.id);
    Contacts.renderContacts(contactsList);
  }

  if (editBtn) {
    const li = editBtn.parentElement.parentElement;
    const status = li.getAttribute("status");
    const contactInputName = li.children[0].children[0];
    const contactInputPhone = li.children[0].children[1];
    const contactEditBtn = li.children[1].children[0];

    if (status === "inputs-deshabilitados") {
      // 1. Remover el readonly
      contactInputName.removeAttribute("readonly");
      contactInputPhone.removeAttribute("readonly");
      // 2. Cambiar el status
      li.setAttribute("status", "inputs-habilitados");
      // 3. Cambiar icono del boton para reflejar el estado
      contactEditBtn.innerHTML = Contacts.editIconEnabled;
      // 4. Cambiar estilos de los inputs para reflejar el estado
      contactInputName.classList.add("contacts-list-item-name-input-edit");
      contactInputPhone.classList.add("contacts-list-item-phone-input-edit");
      // 5. Uso el evento para cambiar el color si es incorrecto
      contactInputName.addEventListener("input", (e) => {
        nameValidation = NAME_REGEX.test(contactInputName.value);
        renderValidation(contactInputName, nameValidation);
      });

      contactInputPhone.addEventListener("input", (e) => {
        phoneValidation = PHONE_REGEX.test(contactInputPhone.value);
        renderValidation(contactInputPhone, phoneValidation);
      });
    }

    if (
      status === "inputs-habilitados" &&
      nameValidation === true &&
      phoneValidation === true
    ) {
      // 1. Anadir el readonly
      contactInputName.setAttribute("readonly", true);
      contactInputPhone.setAttribute("readonly", true);
      // 2. Cambiar el estatus inputs
      li.setAttribute("status", "inputs-deshabilitados");
      // 3. Cambiar icono del boton para reflejar el estado
      contactEditBtn.innerHTML = Contacts.editIconDisabled;
      // 5. Actualizar el contacto encontrado
      const updatedContact = {
        id: li.id,
        name: contactInputName.value,
        phone: contactInputPhone.value,
      };

      Contacts.updateContact(updatedContact);
      // 6. Guardar
      Contacts.saveInBrowser();
      // 7. Mostrar lista actualizada en HTML
      Contacts.renderContacts(contactsList);
    }
  }
});

window.onload = () => {
  Contacts.getContactsFromLocalStorage();
  Contacts.renderContacts(contactsList);
};
