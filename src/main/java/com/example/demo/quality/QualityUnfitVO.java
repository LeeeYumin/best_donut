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
	
	
	
}