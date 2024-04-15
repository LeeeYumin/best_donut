package com.example.demo.quality;


import java.sql.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class QualityUnfitVO {
	
	//bad_diary
	private String badDairyCode;
	private String badSep;
	private String check_code; //자재 검사 이름은 '수입검사' 1개 고정
	
	private Integer bad_cnt;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Date writeDate;
	private String usersCode;
	private String badContents;
	private String mngContents;
	
	//완제품 불량폐기 : 제품코드 생산지시코드 완제품LOT 
	private String productCode; //PROD_PLAN_DETAIL
	private String prodReqDetailCode; //PROD_PLAN_DETAIL
	private String productLotCode; //PRODUCT_INOUT_HISTORY
	private String lastResult; //PRODUCT_QLTY_CHECK 최종결과
	
	//폐기보고서
	
	 	
}
