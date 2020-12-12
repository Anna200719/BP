const displayBPartnersButton = document.getElementById("displayBp");
displayBPartnersButton.addEventListener('click', displayBPartners);

const deleteBPartnerButton = document.getElementById("deleteBp");
deleteBPartnerButton.addEventListener('click', deleteBPartner);

document.getElementById("addBp").addEventListener('click', addBPartner);
document.getElementById("submitBp").addEventListener('click', submitBPartner);

const state = {
    "selectedRow": NaN
}

const businessPartnersKeys = new Set(["cardCode", "cardName", "cardType", "groupCode", "address",
 "zipCode", "mailAddress", "mailZipCode", "phone1", "phone2"])

function deleteBPartner() {
    $.ajax({
        type: 'DELETE',
        url: "/deletepartner",
        data: { "id_to_delete": state.selectedRow.id },
        success: function (data) {
            console.log("removed sucssesfully");
            state.selectedRow.row.remove()
            state.selectedRow = NaN
        }
    });
}

function displayBPartners() {
    $.ajax({
        type: "GET",
        url: "/businesspartners",
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            let businessPartners = data;
            console.log("my partners:" + JSON.stringify(businessPartners))
            $('#bp-form').hide()
            buildTable(businessPartners)
        },
        fail: function (xhr, textStatus, errorThrown) {
            alert('request failed');
        }
    })
}

function addBPartner() {
    $('#businessPartnersTable').hide()
    $('#bp-form').show()
}

function submitBPartner(){
    var formData = JSON.stringify($("#bp-form").serializeArray());
    console.log(formData)

    $.ajax({
        type: "POST",
        url: "/addbusinesspartner",
        data: formData,
        success: function(){
            $('#bp-form').hide()
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.responseJSON)
        },
        dataType: "json",
        contentType : "application/json"
      });
}

function rowSelectedHandler(e) {
    var id = e.target.textContent;
    let selectedRow = $(e.target).parent();
    if (!state.selectedRow) {
        selectedRow.css('background-color', 'grey');
        state.selectedRow = {
            'row': selectedRow,
            'id': id
        };
    }
    else {
        let prevId = state.selectedRow.id;
        let prevRow = state.selectedRow.row
        prevRow.css('background-color', 'white');
        selectedRow.css('background-color', 'grey');
        state.selectedRow = {
            'row': selectedRow,
            'id': id
        };
    }
}


function buildTable(businessPartners) {
console.log(JSON.stringify(businessPartners[0]));
    $('#businessPartnersTable').show()
    var tableBody = $('#bp-table-rows')
    tableBody.children().remove();
    for (const partnerIdx in businessPartners) {
        let partner = businessPartners[partnerIdx]
        let row = $("<tr id=" + partner["cardCode"] + "></tr>")
        let firstColumn = true;

        for (const key of businessPartnersKeys) {
            if (firstColumn) {
                row.append("<th scope=\"row\">" +
                    partner[key] + "</th>");
                firstColumn = false;
            }
            else {
                row.append("<td>" + partner[key] + "</td>");
            }
        }

        row.on("click", rowSelectedHandler)
        tableBody.append(row)
    }
}

$( document ).ready(function() {
    $('#bp-form').hide()
    $('#businessPartnersTable').hide()
});