import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.*;


@WebServlet(urlPatterns = "/Order")
public class PlaceOrderServlets extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            Class.forName("com.mysql.jdbc.Driver");

            String oid = req.getParameter("orderID");
            String customerID = req.getParameter("customerID");
            String itemCode = req.getParameter("itemCode");
            String date = req.getParameter("date");
            String subTotal = req.getParameter("subTotal");



            try (Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/company", "root", "1234")) {

                String sql = "INSERT INTO orderdetails (orderID, customerID ,itemCode ,date,subTotal) VALUES (?, ?, ?, ?,?)";
                try (PreparedStatement pst = connection.prepareStatement(sql)) {
                    pst.setString(1, oid);
                    pst.setString(2, customerID);
                    pst.setString(3, itemCode);
                    pst.setString(4, date);
                    pst.setString(5, subTotal);

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

}
