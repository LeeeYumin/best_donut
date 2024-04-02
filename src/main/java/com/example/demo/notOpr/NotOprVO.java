package com.example.demo.notOpr;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class NotOprVO {

	private String notOprCode;
	private String notOprSep;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date beginDate;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date endDate;
	private String contentsContents;
	private String usersCode;
	private String eqmCode;
	
}
