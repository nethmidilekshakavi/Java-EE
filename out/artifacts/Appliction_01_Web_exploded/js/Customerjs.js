
const fetchCustomerData = () => {
    $.ajax({
        url: "http://localhost:8080/Appliction_01_Web_exploded/customer",
        type: "GET",
        success: (res) => {
            console.log(res);
            const tblCustomer = $('#customer-Table');
            tblCustomer.empty();
            res.forEach(customer => {
                tblCustomer.append(`
                    <tr id="row-${customer.id}">
                        <td>${customer.id}</td>
                        <td>${customer.name}</td>
                        <td>${customer.address}</td>
                       
    <button class="btn btn-danger btn-sm btn-delete">Delete</button>
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

fetchCustomerData()

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
            fetchCustomerData() // Refresh the table
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
$('#btn_update_customer').click((e) => {
    e.preventDefault();

    const id = $('#updated_student_id').val();
    const name = $('#updated_name').val();
    const address = $('#updated_address').val();

    $.ajax({
        url : `http://localhost:8080/Appliction_01_Web_exploded/customer?id=${id}&name=${name}&address=${address}`,
        type: "PUT",
        data: {
            id,
            name,
            address
        },
        success: () => {
            alert("Customer updated successfully!");
            $('#updateCustomerModal').modal('hide');

            // Update the array
            $('#updated_student_id').val('');
            $('#updated_name').val('');
            $('#updated_address').val('');

            fetchCustomerData()
        },
        error: (err) => {
            console.error(err);
            alert("Failed to update customer. Please try again.");
        }
    });
});


$('#btn_delete_customer').click((e) => {
    let id = $('#id').val();
    console.log(id);
    $.ajax({
        url: `http://localhost:8080/Appliction_01_Web_exploded/customer?id=${id}`,
        type : 'DELETE',
        success : function (response) {
            fetchCustomerData()

        },
        error : function (error){
            console.log(error)
        }
    })
})