package com.example.demo.orders;

import lombok.Data;

@Data
public class OrdersDetail {
	private String orders_detail_code;
	private String orders_code;
	private String product_code;
	private Integer orders_cnt;
	private Integer supply_price;
	private Integer tax;
	private Integer total_supply_price;
}
