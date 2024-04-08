package com.example.demo.orders;

import java.util.Date;

import lombok.Data;

@Data
public class ProdReqVO {
	private String prodReqCode;		// 생산요청코드
	private Integer totalReqCnt;	// 총요청수량
	private Date reqDate;			// 요청일자
	private String usersCode;		// 담당자코드
	private String prodReqStatus;	// 생산요청상태
}
