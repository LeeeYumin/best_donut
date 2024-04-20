package com.example.demo.product;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ProductInoutVO {
	
	// DB 필드
	private String productInoutCode;	// 완제품 입출 코드
	private String inoutSep;			// 입출 구분
	private Integer inoutCnt;			// 입출 수량
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Date inoutDate;				// 입출 일자
	private String productLotCode;		// 완제품 LOT 코드
	private String ordersDetailCode;	// 주문 상세 코드
	private String prodReqDetailCode;	// 생산 요청 상세 코드
	private String usersCode;			// 담당자 코드
	
	// 추가 필드
	private String productName;			// 제품명
	private String companyName;			// 거래처명
	private String companyCode;			// 거래처코드
	private String usersName;			// 담당자명

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Date searchStartDate;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Date searchEndDate;
	
}
