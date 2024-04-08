package com.example.demo.quality;

import java.sql.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ProQltyVO {
	
	//완제품 품질 검사 항목
	private String productQltyCheckCode;
	private String productLotCode;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Date checkRecvDate;
	private String foreignExist;
	private String packStatus;
	private String addStand;
	private Integer productWeight;
	private String lastResult;
	private Integer goodCnt;
	

}
