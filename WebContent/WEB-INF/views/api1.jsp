<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8"/>
    <title>API 1</title>
        
    <spring:url value ="/resources/" var="resourceURL" />
    
    <link rel='stylesheet' href='${resourceURL}jquery-ui/jquery-ui.min.css' />
    <link rel='stylesheet' href='${resourceURL}css/bootstrap-combined.min.css' />
    <script src='${resourceURL}fullcalendar/lib/jquery.min.js'></script>
    <script src='${resourceURL}css/bootstrap.min.js'></script>
    <script src='${resourceURL}fullcalendar/lib/moment.min.js'></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src='${resourceURL}js/api.js'></script>
	
    <link rel="stylesheet" href="${resourceURL}css/style.css" />
    <link rel="stylesheet" href="${resourceURL}css/api.css" />
</head>

<body>
	
	<div id="map-container">
		<div id="header-div">
			<h2 id="api1-header">Search Hangout Place Nearby</h2>
		</div>
		<div id="map"></div>
		<div id="user-location-details">
			<p class="field-label">
					Your Current Location:
			</p>
			<p id="user-address" class="bold-font">
			</p>
			<p id="time-updated" class="field-label">
					Current Weather
			</p>
			<div id="condition-div">
				<img id="condition-icon" >
				<p id="condition-text" class="bold-font"></p>
			</div>
			<div>
			<p id="curr-temp">
				Current Temperature:<br/>
			</p>
			<p id="feels-temp">
				Feels Like:<br/>
			</p>
			</div>
		</div>
		<div id="search-form">
				
				<p class="field-label">Search Hangout Place:</p> <input type="text" id="search-keyword" name="searchKeyword" />&emsp;
				
				<p class="field-label">Radius (in meters):</p><input id="search-radius" name="searchRadius" type="number" max="50000" min="500" />
				
				<br/><input id="srch-btn" class="ui-button ui-widget ui-corner-all" type="button" name="Search" value="Search" />
		
		</div>
	</div>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBbwxQl4sRc5ifJIlvNGnxRdUn2d1dmwEQ&callback=initMap&libraries=places,visualization" async defer></script>
	
</body>
	
</html>