<%@ page session="true" %>
<%
  session.invalidate();  // Clears session
  response.sendRedirect("index.jsp"); // Redirect to home
%>
