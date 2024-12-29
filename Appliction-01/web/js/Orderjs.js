
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

