import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@WebServlet(urlPatterns = "/orderdetails")
public class OrderDetailsServlets extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String itemid=req.getParameter("itemId");
        String orderid=req.getParameter("orderId");

        System.out.println(itemid + "itemid details");
        System.out.println(orderid + "orderid details");


        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection= DriverManager.getConnection("jdbc:mysql://localhost:3306/company","root","1234");

            PreparedStatement pst=connection.prepareStatement("insert into orderdetails values(?,?)");
            pst.setString(1,itemid);
            pst.setString(2,orderid);
            pst.executeUpdate();

        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }
}
