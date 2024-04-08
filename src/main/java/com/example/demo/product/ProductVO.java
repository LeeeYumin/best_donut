package com.example.demo.product;

import lombok.Data;

@Data
public class ProductVO {
	private String productCode;
	private String productName;
	private Integer unitPrice;
	private Integer stockCnt;
	private Integer safeStockCnt;
}
