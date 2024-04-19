package com.example.demo.orders;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ProdReqVO {
	
	// DB 필드
	private String prodReqCode;						// 생산요청코드
	private Integer totalReqCnt;					// 총요청수량
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Date reqDate;							// 요청일자
	private String usersCode;						// 담당자코드
	private String prodReqStatus;					// 생산요청상태
	
	// 추가 필드
	private List<ProdReqDetailVO> prodReqDetList;	// 생산요청상세(리스트)
	private String usersName;						// 담당자명
	
//	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Date dueStartDate;						// 납기검색시작일
//	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Date dueEndDate;						// 납기검색종료일
//	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Date prodReqStartDate; 					// 요청검색시작일
//	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Date prodReqEndDate;					// 요청검색종료일 
}
