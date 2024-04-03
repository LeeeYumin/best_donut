package com.example.demo.eqm;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class EqmVO {
	
	private String eqmCode;
	private String eqmName;
	private String modelName;
	private String maker;
	private String purpose;
	private String installPlace;
	private String buyCompany;
	private Integer buyPrice;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date buyDate;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date dumpDate;
	private String checkCycle;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date lastCheckDate;
	private String eqmStatus;
	private String oprStatus;

}
