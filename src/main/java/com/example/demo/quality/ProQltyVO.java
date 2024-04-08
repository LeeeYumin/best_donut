package com.example.demo.quality;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ProQltyVO {
	
	private String productCode; //product_detail 완제품코드
	private String productName; //product 완제품명
	private String productLotCode; //product_detail 완제품Lot코드
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date endTime; //proc_detail 종료시간
	private String procStatus; //proc_detail 공정상태

}
