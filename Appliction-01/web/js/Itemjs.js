const fetchItemData = () => {
    $.ajax({
        url: "http://localhost:8080/Appliction_01_Web_exploded/item",
        type: "GET",
        success: (res) => {
            console.log(res)
            const tblItem = $('#ItemTableBody')

            tblItem.empty()
            res.forEach(item => {

                tblItem.append(`
                        <tr>
                            <td>${item.code}</td>
                            <td>${item.description}</td>
                            <td>${item.qty}</td>
                            <td>${item.price}</td>
                            <td>
                          
                        </td>
                        </tr>
                    `)
            })
        },
        error: (err) => {
            console.error(err)
        }
    })

}
fetchItemData()

//save
$('#btn_save_Item').on('click', function (e) {
    e.preventDefault();

    const code = $('#code').val().trim();
    const desc = $('#desc').val().trim();
    const qty = $('#qty').val().trim();
    const price = $('#price').val().trim();

    if (!code || !desc || !qty || !price) {
        alert("All fields are required!");
        return;
    }

    $.ajax({
        url: "http://localhost:8080/Appliction_01_Web_exploded/item",
        type: "POST",
        data: {
            item_code : code,
            description: desc,
            quantity :qty,
            price: price
        },
        success: () => {
            alert("Item saved successfully!");
            $('#itemModal').modal('hide');
            fetchItemData();
            $('#code').val('');
            $('#desc').val('');
            $('#qty').val('');
            $('#price').val('');
        },
        error: (err) => {
            console.error(err);
            alert("Failed to save item. Please try again.");
        }
    });
});
fetchItemData()


$('#btn_update_item').click((e) => {
    e.preventDefault();

    // Get updated values from modal fields
    const code = $('#updated_Item_id').val();
    const desc = $('#updated_desc').val();
    const qty = $('#updated_qty').val();
    const price = $('#updated_price').val();

    $.ajax({
        url: `http://localhost:8080/Application_01_Web_exploded/item?item_code=${code}&description=${desc}&quantity=${qty}&price=${price}`,
        type: "PUT",
        data:{
            code,
            desc,
            qty,
            price
        },
        success: () => {
            alert("Item updated successfully!");
            $('#updateItemModal').modal('hide');

            // Clear modal fields
            $('#updated_Item_id').val('');
            $('#updated_desc').val('');
            $('#updated_qty').val('');
            $('#updated_price').val('');

            // Refresh item data
            fetchItemData();
        },
        error: (err) => {
            console.error(err);
            alert("Failed to update item. Please try again.");
        }
    });
});

$('#btn_delete_item').click(() => {
    console.log("delete ekat awa")
    let code1 = $('#delete_item_code').val();
    console.log(code1 + "hiiiiii")
    $.ajax({
        url: `http://localhost:8080/Appliction_01_Web_exploded/item?item_code=${code1}`,
        type : 'DELETE',
        success:()=>{
            fetchItemData()
        },
        error: (err) => {
            console.error(err);
            alert("Failed to delete item. Please try again.");
        }
    })
})