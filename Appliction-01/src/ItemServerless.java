import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import java.io.IOException;
import java.sql.*;

@WebServlet(urlPatterns = "/item")
public class ItemServerless extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection =  DriverManager.getConnection("jdbc:mysql://localhost:3306/company", "root","1234");
            ResultSet resultSet = connection.prepareStatement("select * from item").executeQuery();

            //create json array builder
            JsonArrayBuilder allItem = Json.createArrayBuilder();


            while ((resultSet.next())){
                //methna colum eke name ekama denna one aniwareynma
                String code = resultSet.getString("item_code");
                String desc = resultSet.getString("description");
                String qty = resultSet.getString("quantity");
                String price = resultSet.getString("price");
                System.out.println(code+desc+qty+price);

                JsonObjectBuilder item = Json.createObjectBuilder();

                item.add("code", code);
                item.add("description",desc );
                item.add("qty", qty);
                item.add("price", price);


                allItem.add(item);
                System.out.println(allItem);

            }

            resp.setContentType("application/json");
            resp.getWriter().write(allItem.build().toString());



        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            Class.forName("com.mysql.jdbc.Driver");

            String id = req.getParameter("item_code");
            String description = req.getParameter("description");
            String qty = req.getParameter("quantity");
            String price = req.getParameter("price");



            try (Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/company", "root", "1234")) {

                String sql = "INSERT INTO item (item_code, description, quantity,price) VALUES (?, ?, ?, ?)";
                try (PreparedStatement pst = connection.prepareStatement(sql)) {
                    pst.setString(1, id);
                    pst.setString(2, description);
                    pst.setString(3, qty);
                    pst.setString(4, price);

                    int rowsAffected = pst.executeUpdate();
                    resp.setContentType("text/plain");
                    if (rowsAffected > 0) {
                        resp.getWriter().write("Item added successfully.");
                    } else {
                        resp.getWriter().write("Failed to add item.");
                    }
                }
            }
        } catch (ClassNotFoundException | SQLException e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("Error: " + e.getMessage());
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            Class.forName("com.mysql.jdbc.Driver");

            String code = req.getParameter("item_code");
            String description = req.getParameter("description");
            String qty = req.getParameter("quantity");
            String price = req.getParameter("price");

            try (Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/company", "root", "1234")) {

                String sql = "UPDATE item SET  description  = ?, quantity  = ?, price = ? WHERE  item_code  = ?";
                try (PreparedStatement pst = connection.prepareStatement(sql)) {
                    pst.setString(1, description);
                    pst.setString(2, qty);
                    pst.setString(3, price);
                    pst.setString(4, code);

                    int rowsAffected = pst.executeUpdate();
                    resp.setContentType("text/plain");
                    if (rowsAffected > 0) {
                        resp.getWriter().write("Item updated successfully.");
                    } else {
                        resp.getWriter().write("Failed to update item. Item ID not found.");
                    }
                }
            }
        } catch (ClassNotFoundException | SQLException e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("Error: " + e.getMessage());
        }
    }
}
