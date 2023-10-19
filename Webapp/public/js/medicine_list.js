var prescriptionItems = [];
var allergicMedicines = ['advil', 'tylenol'];

function renderPrescription(item) {
  const table = document.querySelector('#table');

  const node = document.createElement("tr");
  node.setAttribute('class', `prescription-item`);
  node.setAttribute('data-key', item.id);

  node.innerHTML = `
    <td>${item.medicine_name}</td>
    <td>${item.medicine_conc}</td>
    <td>${item.medicine_dosg}</td>
    <td>${item.medicine_quantity}</td>
    <button type='button' class="delete-item js-delete-item">
      delete
    </button>
  `;

  table.append(node);
}

function addPrescriptionItem(medicine_name, medicine_conc, medicine_dosg, medicine_quantity) {
    const item = {
      medicine_name,
      medicine_conc,
      medicine_dosg,
      medicine_quantity,
      id: Date.now()
    };
  
    prescriptionItems.push(item);
    renderPrescription(item);
}

function showAlertPopup() {
  $('#allergic_med_popup').show();
}

function hideAlertPopup() {
  $('#allergic_med_popup').hide();
}

const addAllergicMed = document.querySelector("#allergic_med_add");
addAllergicMed.addEventListener('click', () => {
  const medicine_name = document.querySelector('#medicine_name');
  const medicine_conc = document.querySelector('#medicine_conc');
  const medicine_dosg = document.querySelector('#medicine_dosg');
  const medicine_quantity = document.querySelector('#medicine_quantity');
  
  const medicine_name_text =  medicine_name.value.trim();
  const medicine_conc_text = medicine_conc.value.trim();
  const medicine_dosg_text = medicine_dosg.value.trim();
  const medicine_quantity_text = medicine_quantity.value.trim();

  addPrescriptionItem(medicine_name_text, medicine_conc_text, medicine_dosg_text, medicine_quantity_text);
  medicine_name.value = '';
  medicine_conc.value = '';
  medicine_dosg.value = '';
  medicine_quantity.value = '';
  hideAlertPopup();
});

const cancelAllergicMed = document.querySelector("#allergic_med_cancel");
cancelAllergicMed.addEventListener('click', () => {
  const medicine_name = document.querySelector('#medicine_name');
  const medicine_conc = document.querySelector('#medicine_conc');
  const medicine_dosg = document.querySelector('#medicine_dosg');
  const medicine_quantity = document.querySelector('#medicine_quantity'); 

  medicine_name.value = '';
  medicine_conc.value = '';
  medicine_dosg.value = '';
  medicine_quantity.value = '';
  hideAlertPopup();
});

function handleAllergicMedicine(medicine_name_text) {

  document.querySelector('#allergic_medname').innerText = medicine_name_text;
  showAlertPopup();
}

const addBtn = document.querySelector("#add_medicine");

addBtn.addEventListener('click', () => {
  const medicine_name = document.querySelector('#medicine_name');
  const medicine_conc = document.querySelector('#medicine_conc');
  const medicine_dosg = document.querySelector('#medicine_dosg');
  const medicine_quantity = document.querySelector('#medicine_quantity');
  
  const medicine_name_text =  medicine_name.value.trim();
  const medicine_conc_text = medicine_conc.value.trim();
  const medicine_dosg_text = medicine_dosg.value.trim();
  const medicine_quantity_text = medicine_quantity.value.trim();

  if (allergicMedicines.includes(medicine_name_text.toLowerCase())) {
    handleAllergicMedicine(medicine_name_text);
  } else if (medicine_name_text !== '') {
    console.log(2);
    addPrescriptionItem(medicine_name_text, medicine_conc_text, medicine_dosg_text, medicine_quantity_text);
    medicine_name.value = '';
    medicine_conc.value = '';
    medicine_dosg.value = '';
    medicine_quantity.value = '';
    medicine_name.focus();
  }
});


const list = document.querySelector('.prescription-list');

list.addEventListener('click', event => {

  if (event.target.classList.contains('js-delete-item')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteItem(itemKey);
  }
});

function deleteItem(key) {
  key = Number(key);
  prescriptionItems = prescriptionItems.filter(item => item.id !== key);
  const item = document.querySelector(`[data-key='${key}']`);
  item.remove();
}