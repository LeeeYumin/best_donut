package com.example.demo.bom;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class BomVO {
	// bom 컬럼들
	private String bomCode;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date writeDate;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date applyDate;
	private String applyStatus;
	private String productCode;
	private String usersCode;
	
	// bom_detail 칼럼들 
	private String bomDetailCode;
	private Long needCnt;
	private String unit;
	private String matCode;
	
	// 자재 발주를 위한 칼럼들
	private Integer unitPrice;
	private String matName;
	
}
