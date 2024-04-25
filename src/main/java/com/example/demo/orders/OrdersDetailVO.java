package com.example.demo.orders;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdersDetailVO {
	
	// DB 필드
	private String ordersDetailCode;	// 주문상세코드
	private String ordersCode;			// 주문코드
	private String productCode;			// 제품코드
	private Integer ordersCnt;			// 주문수량
	private Integer supplyPrice;		// 공급단가
	private Integer tax;				// 부가세
	private Integer totalSupplyPrice;	// 총공급대가
	
	// 추가 필드
	private String productName;			// 제품명
	private String stockCnt;			// 재고수량
}
