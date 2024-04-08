package com.example.demo.orders;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
