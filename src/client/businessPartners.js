const displayBPartnersButton = document.getElementById('displayBp');
const deleteBPartnerButton = document.getElementById('deleteBp');
const state = {
  selectedRow: NaN,
};

const businessPartnersKeys = new Set(['cardCode', 'cardName', 'cardType', 'groupCode', 'address',
  'zipCode', 'mailAddress', 'mailZipCode', 'phone1', 'phone2']);

function rowSelectedHandler(e) {
  const id = e.target.textContent;
  const selectedRow = $(e.target).parent();
  if (!state.selectedRow) {
    selectedRow.css('background-color', 'grey');
    state.selectedRow = {
      row: selectedRow,
      id,
    };
  } else {
    const prevRow = state.selectedRow.row;
    prevRow.css('background-color', 'white');
    selectedRow.css('background-color', 'grey');
    state.selectedRow = {
      row: selectedRow,
      id,
    };
  }
}

function buildTable(businessPartners) {
  $('#businessPartnersTable').show();
  const tableBody = $('#bp-table-rows');
  tableBody.children().remove();
  Object.keys(businessPartners).forEach((partnerIdx) => {
    const partner = businessPartners[partnerIdx];
    const row = $(`<tr id=${partner.cardCode}></tr>`);
    let firstColumn = true;
    businessPartnersKeys.forEach((key) => {
      if (firstColumn) {
        row.append(`<th scope="row">${
          partner[key]}</th>`);
        firstColumn = false;
      } else {
        row.append(`<td>${partner[key]}</td>`);
      }
    });
    row.on('click', rowSelectedHandler);
    tableBody.append(row);
  });
}

function deleteBPartner() {
  $.ajax({
    type: 'DELETE',
    url: '/partner',
    data: { id_to_delete: state.selectedRow.id },
    success() {
      console.log('removed sucssesfully');
      state.selectedRow.row.remove();
      state.selectedRow = NaN;
    },
  });
}

function displayBPartners() {
  $.ajax({
    type: 'GET',
    url: '/businesspartners',
    contentType: 'application/json',
    dataType: 'json',
    success(data) {
      const businessPartners = data;
      console.log(`my partners:${JSON.stringify(businessPartners)}`);
      $('#bp-form').hide();
      buildTable(businessPartners);
    },
    fail() {
      alert('request failed');
    },
  });
}

deleteBPartnerButton.addEventListener('click', deleteBPartner);
displayBPartnersButton.addEventListener('click', displayBPartners);
function addBPartner() {
  $('#businessPartnersTable').hide();
  $('#bp-form').show();
}

function submitBPartner() {
  const formData = JSON.stringify($('#bp-form').serializeArray());
  console.log(formData);

  $.ajax({
    type: 'POST',
    url: '/businesspartner',
    data: formData,
    success() {
      $('#bp-form').hide();
    },
    error(xhr) {
      alert(JSON.parse(xhr.responseText));
    },
    dataType: 'json',
    contentType: 'application/json',
  });
}

$(document).ready(() => {
  $('#bp-form').hide();
  $('#businessPartnersTable').hide();
  document.getElementById('addBp').addEventListener('click', addBPartner);
  document.getElementById('submitBp').addEventListener('click', submitBPartner);
});
