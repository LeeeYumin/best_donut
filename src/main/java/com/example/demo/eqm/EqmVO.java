package com.example.demo.eqm;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

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
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date buyDate;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date dumpDate;
	private String checkCycle;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date lastCheckDate;
	private String imageCode;
	
	private String eCode;
	
	private String eqmStatus;
	private String oprStatus;
	
	private String keyword;
	private String status;
	private String work;

}
