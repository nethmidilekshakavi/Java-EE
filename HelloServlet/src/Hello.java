import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;


@WebServlet(urlPatterns = "/hii")
public class Hello extends HttpServlet{

    //main meethod eka one na project eka run wenna
   /* public static void main(String[] args) {
        System.out.println("Hello world!");
    }*/

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter o = resp.getWriter();
        o.println("doPut Response");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
       String servletPath = req.getServletPath();
       String requestURI = req.getRequestURI();
       String contentPath = req.getContextPath();
       String method = req.getMethod();
       String pathInfo = req.getPathInfo();
       String remoteUser = req.getRemoteUser();


        System.out.println("Servlet Path :" + servletPath);
        System.out.println("Request Path :" + requestURI);
        System.out.println("Content Path :" + contentPath);
        System.out.println("Method :" + method);
        System.out.println("PathInfo :" + pathInfo);
        System.out.println("RemoteUser :" + remoteUser);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter o = resp.getWriter();
        o.println("doPost Response");
    }


}