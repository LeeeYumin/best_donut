package com.example.demo.orders;

import lombok.Data;

@Data
public class ProdReqDetailVO {

	// DB 필드
	private String prodReqDetailCode;	// 생산요청상세코드
	private int reqCnt;					// 요청수량
	private String prodReqCode;			// 생산요청코드
	private String productCode;			// 제품코드
	
	// 추가 필드
	private String productName;			// 제품명
}
