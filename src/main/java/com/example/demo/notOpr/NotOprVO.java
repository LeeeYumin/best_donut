package com.example.demo.notOpr;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class NotOprVO {

	private String notOprCode;
	private String notOprSep;
	
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")	// 조회
	@DateTimeFormat(pattern = "yyyy-MM-dd")	// 등록
	private Date beginDate;
	
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date endDate;
	private String contentsContents;
	private String usersCode;
	private String eqmCode;
	
	private String eqmName;
	private String usersName;
	
	private String keyword;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date noneDate;
	private String status;
	
}
