package com.example.demo.quality;


import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class QualityUnfitVO {

	private String badDairyCode;
	private String badSep;
	private String check_code; //자재 검사 이름은 '수입검사' 1개 고정
	private Integer bad_cnt;
	private Date write_date;
	private String usersCode;
	private String badContents;
	private String mngContents;
	 
	//완제품 불량품등록 : 제품코드 생산지시코드 제품명 완제품LOT 판매가능여부
	private String productCode;
	private String productLotCode;
	
	
	
	
}
