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
	private String procCode; //PROC 컬럼에서 추가함. 공정 코드 
	
	// bom_detail 칼럼들 
	private String bomDetailCode;
	private Long needCnt; //소요수량
	private String unit; //단위
	private String matCode; //자재코드
	
	// 자재 발주를 위한 칼럼들
	private String productName;
	private Integer unitPrice;
	private String matName;
	private Integer procNeedCnt;
	private String matUnit;
	
}
