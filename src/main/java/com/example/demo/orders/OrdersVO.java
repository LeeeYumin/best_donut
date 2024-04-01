package com.example.demo.orders;

import java.util.Date;

import lombok.Data;

@Data
public class OrdersVO {
	
	private String ordersCode;
	private Date ordersDate;
	private Date dueDate;
	private Integer totalOrdersPrice;
	private String ordersStatus;
	private String usersCode;
	private String companyCode;
	
}
