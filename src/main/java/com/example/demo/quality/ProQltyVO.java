package com.example.demo.quality;

import java.sql.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
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
	private String productWeight;
	private String lastResult; //판매가능, 판매부락(폐기)
	private Integer goodCnt;
	
	//Product_detail
	private String qltyCheckStatus; //품질검사상태
	private String productCode; 
	
	//PRODUCT (완제품 품질 관리)
	private String productName;
	
	private String usersCode;
}
