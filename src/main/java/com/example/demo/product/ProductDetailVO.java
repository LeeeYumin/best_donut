package com.example.demo.product;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

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
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Date dumpDate;				// 폐기일자
	private String productCode;			// 완제품코드
	
	private String procResultCode;		// 공정실적코드
	
	// 추가 필드
	private String productName;			// 제품명
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Date allEndTime;			// 공정종료시간
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Date expDate;				// 유통기한
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Date expStartDate;			// 유통기한검색시작일
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Date expEndDate;			// 유통기한검색종료일
	
}
