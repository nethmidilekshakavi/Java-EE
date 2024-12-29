import {customer_Array} from "../db/database.js";

// Fetch all customer data and update the array
const fetchStudentData = () => {
    $.ajax({
        url: "http://localhost:8080/Appliction_01_Web_exploded/customer",
        type: "GET",
        success: (res) => {
            console.log(res);
            customer_Array = res;
            const tblCustomer = $('#customer-Table');
            tblCustomer.empty();
            res.forEach(customer => {
                tblCustomer.append(`
                    <tr id="row-${customer.id}">
                        <td>${customer.id}</td>
                        <td>${customer.name}</td>
                        <td>${customer.address}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editcutomer('${customer.id}', '${customer.name}', '${customer.address}')">Edit</button>
                            <button class="btn btn-danger btn-sm btn-delete" data-id="${customer.id}">Delete</button>
                        </td>
                    </tr>
                `);
            });
        },
        error: (err) => {
            console.error(err);
        }
    });
};

fetchStudentData();

// Save a new customer
$('#btn_save_student').on('click', function (e) {
    e.preventDefault();

    const id = $('#id').val().trim();
    const name = $('#name').val().trim();
    const address = $('#address').val().trim();

    if (!id || !name || !address) {
        alert("All fields are required!");
        return;
    }

    $.ajax({
        url: "http://localhost:8080/Appliction_01_Web_exploded/customer",
        type: "POST",
        data: {
            id: id,
            name: name,
            address: address
        },
        success: () => {
            alert("Customer saved successfully!");
            $('#studentModal').modal('hide');
            customer_Array.push({ id, name, address }); // Add the new customer to the array
            fetchStudentData(); // Refresh the table
            $('#id').val('');
            $('#name').val('');
            $('#address').val('');
        },
        error: (err) => {
            console.error(err);
            alert("Failed to save customer. Please try again.");
        }
    });
});

// Update customer
$('#btn_update_student').click((e) => {
    e.preventDefault();

    const id = $('#updated_student_id').val();
    const name = $('#updated_name').val();
    const address = $('#updated_address').val();

    $.ajax({
        url: `http://localhost:8080/Appliction_01_Web_exploded/customer`,
        type: "PUT",
        data: {
            id,
            name,
            address
        },
        success: () => {
            alert("Customer updated successfully!");
            $('#updateStudentModal').modal('hide');

            // Update the array
            const index = customer_Array.findIndex(customer => customer.id === id);
            if (index !== -1) {
                customer_Array[index] = { id, name, address };
            }

            fetchStudentData(); // Refresh the table
        },
        error: (err) => {
            console.error(err);
            alert("Failed to update customer. Please try again.");
        }
    });
});

// Edit customer
const editcutomer = (id, name, address) => {
    $('#updated_student_id').val(id);
    $('#updated_name').val(name);
    $('#updated_address').val(address);
    $('#updateStudentModal').modal('show');
};

// Delete customer
$(document).on('click', '.btn-delete', function () {
    const id = $(this).data('id');

    if (!confirm("Are you sure you want to delete this customer?")) {
        return;
    }

    $.ajax({
        url: `http://localhost:8080/Appliction_01_Web_exploded/customer?id=${id}`,
        type: "DELETE",
        success: () => {
            alert("Customer deleted successfully!");

            // Remove the customer from the array
            customer_Array = customer_Array.filter(customer => customer.id !== id);

            $(`#row-${id}`).remove(); // Remove the row from the table
        },
        error: (xhr) => {
            if (xhr.status === 404) {
                alert("Customer ID not found.");
            } else if (xhr.status === 400) {
                alert("Invalid ID format.");
            } else {
                alert("An error occurred. Please try again.");
            }
        }
    });
});
