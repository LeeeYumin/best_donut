package com.example.demo.quality;

import java.sql.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ProQltyVO {
	
	//완제품 품질 검사 항목 (Product_Qlty_Check)
	private String productQltyCheckCode;
	private String productLotCode;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Date checkRecvDate; //검사접수일자
	private String foreignExist;
	private String packStatus;
	private String addStand;
	private Integer productWeight;
	private String lastResult;
	private Integer goodCnt;
	
	//Product_detail
	private String qltyCheckStatus; //품질검사상태


}
