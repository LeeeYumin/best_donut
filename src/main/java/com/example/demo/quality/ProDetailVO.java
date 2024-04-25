package com.example.demo.quality;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ProDetailVO {

	//PRODUCT_DETAIL d
	private String productLotCode; //완제품lot코드
	private Integer warehousingCnt; //입고수량
	private Integer checkDoneCnt;
	private Integer deliveryCnt;
	private Integer remainCnt;
	private String qltyCheckStatus; //품질검사상태
	private String productStatus; //완제품상태
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Date dumpDate;
	private String productCode; //완제품코드
	private String procResultCode;
	
	//다른 테이블 구분
	private String productName; //product 완제품명 p
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Date allEndTime; //proc_result 전체종료시간 c
}
