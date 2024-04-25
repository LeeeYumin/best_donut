package com.example.demo.materials;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class MaterialInOutVO {
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date inoutDate;
	private String matLotCode;
	private String matName;
	private String companyName;
	private Double inoutCnt;
	private String inoutSep;
	
	// 검색 조건용
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date sDate;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date eDate;
	private String[] inoutSeps;
}
