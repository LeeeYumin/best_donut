package com.example.demo.product;

import java.util.Date;

import lombok.Data;

@Data
public class ProductInoutVO {
	
	// DB 필드
	private String productInoutCode;	// 완제품 입출 코드
	private String inoutSep;			// 입출 구분
	private Integer inoutCnt;			// 입출 수량
	private Date inoutDate;				// 입출 일자
	private String productLotCode;		// 완제품 LOT 코드
	private String ordersDetailCode;	// 주문 상세 코드
	private String prodReqDetailCode;	// 생산 요청 상세 코드
	private String usersCode;			// 담당자 코드
	
	// 추가 필드
//	private String ordersCode;			// 주문 코드
//	private String productCode;			// 제품 코드
//	private int ordersCnt;				// 주문 수량
	
}
