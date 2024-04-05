package com.example.demo.notOpr;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class NotOprVO {

	private String notOprCode;
	private String notOprSep;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date beginDate;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
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
