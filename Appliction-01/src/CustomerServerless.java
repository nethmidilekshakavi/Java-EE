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


@WebServlet(urlPatterns = "/customer")
public class CustomerServerless extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection =  DriverManager.getConnection("jdbc:mysql://localhost:3306/company", "root","1234");
            ResultSet resultSet = connection.prepareStatement("select * from customer").executeQuery();

            //create json array builder
            JsonArrayBuilder allCustomer = Json.createArrayBuilder();


            while ((resultSet.next())){
                String id = resultSet.getString("id");
                String name = resultSet.getString("name");
                String address = resultSet.getString("address");
                System.out.println(id+name+address);

                JsonObjectBuilder customer = Json.createObjectBuilder();

                customer.add("id", id);
                customer.add("name", name);
                customer.add("address", address);

                allCustomer.add(customer);

            }

            resp.setContentType("application/json");
            resp.getWriter().write(allCustomer.build().toString());



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

                String id = req.getParameter("id");
                String name = req.getParameter("name");
                String address = req.getParameter("address");

                try (Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/company", "root", "1234")) {

                    String sql = "INSERT INTO customer (id, name, address) VALUES (?, ?, ?)";
                    try (PreparedStatement pst = connection.prepareStatement(sql)) {
                        pst.setString(1, id);
                        pst.setString(2, name);
                        pst.setString(3, address);

                        int rowsAffected = pst.executeUpdate();
                        resp.setContentType("text/plain");
                        if (rowsAffected > 0) {
                            resp.getWriter().write("Customer added successfully.");
                        } else {
                            resp.getWriter().write("Failed to add customer.");
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

            String id = req.getParameter("id");
            String name = req.getParameter("name");
            String address = req.getParameter("address");

            try (Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/company", "root", "1234")) {

                String sql = "UPDATE customer SET name = ?, address = ? WHERE id = ?";
                try (PreparedStatement pst = connection.prepareStatement(sql)) {
                    pst.setString(1, name);
                    pst.setString(2, address);
                    pst.setString(3, id);

                    int rowsAffected = pst.executeUpdate();
                    resp.setContentType("text/plain");
                    if (rowsAffected > 0) {
                        resp.getWriter().write("Customer updated successfully.");
                    } else {
                        resp.getWriter().write("Failed to update customer. Customer ID not found.");
                    }
                }
            }
        } catch (ClassNotFoundException | SQLException e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("Error: " + e.getMessage());
        }
    }


    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection=  DriverManager.getConnection("jdbc:mysql://localhost:3306/company","root","1234");
            PreparedStatement preparedStatement = connection.prepareStatement("delete from customer where id=?");
            String id = req.getParameter("id");
            System.out.println(id + "delete id ekaaa");
            preparedStatement.setString(1,id);
            preparedStatement.executeUpdate();
            resp.setContentType("application/json");

            resp.getWriter().write("Customer Delete successfully.");

        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);

}
}
    }




