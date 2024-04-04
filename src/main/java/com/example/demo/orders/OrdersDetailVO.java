package com.example.demo.orders;

import lombok.Data;

@Data
public class OrdersDetailVO {
	private String ordersDetailCode;
	private String ordersCode;
	private String productCode;
	private Integer ordersCnt;
	private Integer supplyPrice;
	private Integer tax;
	private Integer totalSupplyPrice;
	
	private String productName;
}
