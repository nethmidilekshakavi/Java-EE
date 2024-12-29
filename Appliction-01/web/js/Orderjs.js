
let addCart = [];
let order = [];
let finalTotal = 0;

const selectItemIDs = () => {
    $.ajax({
        url: "http://localhost:8080/Appliction_01_Web_exploded/item",
        type: "GET",
        success: function (res)  {
            let data = res;
            console.log(data + "item ids")
            const select = $('#itemId');
            // Clear existing options
            select.empty();

            // Add a default option
            select.append('<option value="" disabled selected>Select Item Code</option>');


            for(let i = 0; i < data.length; i++){

                let row = `<option value="${data[i].code}">${data[i].code}</option>`
                $('#itemId').append(row)
            }


        },
        error: function (err)  {
            console.error(err);
            alert("Failed to load Item IDs. Please try again.");
        }
    });
};

const selectCusIDs = () => {
    $.ajax({
        url: "http://localhost:8080/Appliction_01_Web_exploded/customer",
        type: "GET",
        success: function (res) {
            let data = res;
            console.log(data)
            const select = $('#customerId');

            // Clear existing options
            select.empty();

            // Add a default option
            select.append('<option value="" disabled selected>Select Customer ID</option>');

            for (let i = 0; i < data.length; i++){

                let row = `<option value="${data[i].id}">${data[i].id}</option>`
                $('#customerId').append(row)

            }


        },
        error: function (err)  {
            console.error(err);
            alert("Failed to load Customer IDs. Please try again.");
        }
    });
};

selectItemIDs()
selectCusIDs()

//load name
$('#customerId').on('change',(e) =>{
    let cid = e.target.value; //value eka target kra gannwa
    console.log(cid +"cid eka awada")
    $.ajax({
        url: "http://localhost:8080/Appliction_01_Web_exploded/customer",
        type: "GET",
        success: function (res){
            let data = res;

            for (let i = 0; i < data.length; i++){
                if (cid == data[i].id){
                    $('#orderCustomer').val(data[i].name)
                }
            }
        }
    })

})

// load items des

$('#itemId').on('change' ,(e) =>{

    let code = e.target.value;
    $.ajax({
        url: "http://localhost:8080/Appliction_01_Web_exploded/item",
        type: "GET",
        success: function (res){

            let data = res;

            for (let i = 0; i< data.length; i++){
                if (code == data[i].code){

                    $('#description').val(data[i].description)
                    $('#price').val(data[i].price)
                    $('#quantity').val(data[i].qty)

                }
            }

        }
    })
})

$("#order-save-cart").on('click', function () {

    const orderData = {
        orderId: $('#OrderID').val(),
        orderDate: $('#orderDate').val(),
        cusId: $('#customerId').val(),
        cusName: $('#orderCustomer').val(),
        code: $('#itemId').val(),
        description: $('#description').val(),
        price: parseFloat($('#price').val()),
        qty: parseInt($('#quantity').val()),
        getQty: parseInt($('#Getquantity').val()),
        discount: parseInt($('#discout').val())
    };

    addCart.push(orderData)
    console.log("get data cart" + orderData)

    loadOrderTable()

})

const loadOrderTable = () => {
    $("#OrderTableBody").empty();
        addCart.forEach((item) => {
        const itemTotal = item.getQty * item.price;
        finalTotal += itemTotal;

        const data = `<tr>
            <td>${item.cusId}</td>
            <td>${item.code}</td>
            <td>${item.orderDate}</td>
            <td>${item.price}</td>
            <td>${item.getQty}</td>
            <td>${itemTotal}</td>
        </tr>`;
        $("#OrderTableBody").append(data);
    });

    console.log(finalTotal)

    $('#Total').val(finalTotal)
};


// Save Order Details
$('#purchase').on('click', () => {
    // Collect form data
    let oid = $('#OrderID').val();
    let orderDate = $('#orderDate').val();
    let cusId = $('#customerId').val();
    let itemId = $('#itemId').val();
    let total = $('#Total').val();

    console.log(oid + orderDate)

    // Make the AJAX POST request
    $.ajax({
        url: "http://localhost:8080/Appliction_01_Web_exploded/Order",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            oid: oid,
            cusId: cusId,
            orderDate: orderDate,
            itemId: itemId,
            total: total
        }),
        success: function (res) {
            console.log("Order successfully saved to the database");
            console.log(res);

            order.push(res)

            // Show success alert
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Order Saved Successfully",
                showConfirmButton: false,
                timer: 1500
            });

            // Reload order details table
            loadOrderDetailsTable();
        },
        error: function (error) {
            console.error("Error saving order:", error);
            Swal.fire({
                icon: "error",
                title: "Failed to Save Order",
                text: "An error occurred while saving the order. Please try again.",
            });
        }
    });
});

const loadOrderDetailsTable = () => {
    $("#OrderDetailTableBody").empty();
    order.forEach((order) => {
        // Calculate total amount based on price and quantity
        const totalAmount = order.price * order.getQty

        // Get the discount value and parse it to a number
        const discount = parseFloat($('#discout').val())

        // Final total after applying the discount
        const finalTotal = totalAmount - discount;

        const data = `<tr>
            <td>${order.oid}</td>
            <td>${order.orderDate}</td>
            <td>${order.cusId}</td>
            <td>${order.itemId}</td>
            <td>${finalTotal.toFixed(2)}</td>
        </tr>`;
        $("#OrderDetailTableBody").append(data);
    });
};
