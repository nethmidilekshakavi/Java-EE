
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
$("#purchase").click((e) => {
        e.preventDefault()

    let orderId = $("#OrderID").val();
    let customerId = $("#customerId").val();
    let itemId = $("#itemId").val();
    let date = $("#orderDate").val();
    let subtotal = $("#Total").val();

    console.log(orderId+"==="+customerId+"==="+subtotal)

    $.ajax({
        url: "http://localhost:8080/Appliction_01_Web_exploded/order",
        type: "POST",
        data: {
            orderID: orderId,
            customerID: customerId,
            itemCode: itemId,
            date: date,
            subTotal: subtotal
        },
        success: function (response) {
            console.log(response);
            orderDetails(orderId)




            loadOrderDetailsTable(); // Refresh the table
        },
        error: function (error) {
            console.error("Error saving order:", error);
        }
    });
});

function orderDetails(orderId) {
    // Replace 'addCart' with your actual array of items
    addCart.forEach(element => {
        console.log(element.item_code)
        $.ajax({
            url: 'http://localhost:8080/Application1_war_exploded/orderdetails',
            type: 'POST',
            data: {
                orderId: orderId,
                item_code: element.item_code
            },
            success: function (response) {
                console.log("Order detail saved successfully.");
                console.log(response + "order resp")

            },
            error: function (error) {
                console.error("Error saving order details:", error);
            }
        });
    });
}

const loadOrderDetailsTable = () => {
    $("#OrderDetailTableBody").empty();
    addCart.forEach((order) => {
        const totalAmount = order.price * order.getQty;
        const discount = parseFloat($('#discout').val()) || 0;
        const finalTotal = totalAmount - discount;

        const data = `<tr>
            <td>${order.orderId}</td>
            <td>${order.orderDate}</td>
            <td>${order.cusId}</td>
            <td>${order.code}</td>
            <td>${finalTotal.toFixed(2)}</td>
        </tr>`;
        console.log(data)
        $("#OrderDetailTableBody").append(data);
    });
};
