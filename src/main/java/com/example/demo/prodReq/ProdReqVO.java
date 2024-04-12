package com.example.demo.prodReq;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class ProdReqVO {
	private String prodReqCode;						// 생산요청코드
	private Integer totalReqCnt;					// 총요청수량
	private Date reqDate;							// 요청일자
	private String usersCode;						// 담당자코드
	private String prodReqStatus;					// 생산요청상태
	
	private List<ProdReqDetailVO> prodReqDetList;	// 생산요청상세 리스트
	private Date dueStartDate;						// 납기시작일
	private Date dueEndDate;						// 납기종료일
	
	private Date prodReqStartDate; 					// 요청시작일
	private Date prodReqEndDate;					// 요청종료일 
	private String usersName;						// 담당자명
}
