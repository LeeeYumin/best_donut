package com.example.demo.product;

import lombok.Data;

@Data
public class ProductVO {
	private String productCode;				// 제품코드
	private String productName;				// 제품명
	private Integer unitPrice;				// 단가
	private Integer stockCnt;				// 재고수량
	private Integer safeStockCnt;			// 안전재고량
	
	private Integer defaultProd = 1400;		// 기본생산량
	private Integer totalOrdersCnt;			// 총주문수량
	
	// 납품후재고량
	private Integer afterOutCnt;			
	// 생산요청수량
	private Integer reqCnt;		
}
