

const selectItemIDs = () => {
    $.ajax({
        url: "http://localhost:8080/Appliction_01_Web_exploded/Order",
        type: "GET",
        success: (res) => {
            console.log(res);
            const select = $('#itemId');

            // Clear existing options
            select.empty();

            // Add a default option
            select.append('<option value="" disabled selected>Select Item Code</option>');

            // Append each item code as an option
            res.items.forEach(item => {
                select.append(`<option value="${item.item_code}">${item.item_code}</option>`);
            });
        },
        error: (err) => {
            console.error(err);
            alert("Failed to load Item IDs. Please try again.");
        }
    });
};

const selectCusIDs = () => {
    $.ajax({
        url: "http://localhost:8080/Appliction_01_Web_exploded/Order",
        type: "GET",
        success: (res) => {
            console.log(res);
            const select = $('#customerId');

            // Clear existing options
            select.empty();

            // Add a default option
            select.append('<option value="" disabled selected>Select Customer ID</option>');

            // Append each item code as an option
            res.items.forEach(item => {
                select.append(`<option value="${item.id}">${item.id}</option>`);
            });
        },
        error: (err) => {
            console.error(err);
            alert("Failed to load Customer IDs. Please try again.");
        }
    });
};

selectItemIDs()
selectCusIDs()





