package com.example.demo.product;

import java.util.Date;

import lombok.Data;

@Data
public class ProductDetailVO {
	
	// DB 필드
	private String productLotCode;		// 제품LOT코드
	private Integer warehousingCnt;		// 입고수량
	private Integer checkDoneCnt;		// 검사완료수량
	private Integer deliveryCnt;		// 출고수량
	private Integer remainCnt;			// 잔고수량
	private String qltyCheckStatus;		// 품질검사상태
	private String productStatus;		// 완제품상태
	private Date dumpDate;				// 폐기일자
	private String productCode;			// 완제품코드
	private String procResultCode;		// 공정실적코드
	
	// 추가 필드
	private String productName;			// 제품명
}