import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;


@WebServlet(urlPatterns = "/Order")
public class PlaceOrderServlets extends HttpServlet {

   /* @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/company", "root", "1234");

            // Fetch Customer IDs
            ResultSet customerResultSet = connection.prepareStatement("SELECT id FROM customer").executeQuery();
            JsonArrayBuilder allCustomers = Json.createArrayBuilder();

            while (customerResultSet.next()) {
                String id = customerResultSet.getString("id");
                System.out.println(id);
                JsonObjectBuilder customer = Json.createObjectBuilder();
                customer.add("id", id);
                allCustomers.add(customer);
            }

            // Fetch Item Codes
            ResultSet itemResultSet = connection.prepareStatement("SELECT item_code FROM item").executeQuery();
            JsonArrayBuilder allItems = Json.createArrayBuilder();

            while (itemResultSet.next()) {
                String code = itemResultSet.getString("item_code");
                JsonObjectBuilder item = Json.createObjectBuilder();
                item.add("item_code", code);
                System.out.println(code);
                allItems.add(item);
            }

            // Combine Customers and Items into one JSON object
            JsonObjectBuilder responseJson = Json.createObjectBuilder();
            responseJson.add("customers", allCustomers);
            responseJson.add("items", allItems);

            // Set response content type and write JSON
            resp.setContentType("application/json");
            resp.getWriter().write(responseJson.build().toString());

        } catch (ClassNotFoundException | SQLException e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }*/

}
