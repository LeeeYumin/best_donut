package com.example.demo.materials;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class MaterialWarehousingVO {
	private String matOrdersCode;
	private String matOrdersDetailCode;
	private String matCode;
	private String companyCode;
	private Integer ordersCnt;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date ordersDate;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date dueDate;

	// 테이블 보여주기용 컬럼
	private String matName;
	private String companyName;
	
	// 검색 조건용 컬럼
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date sDate;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date eDate;
	
	// 입고 등록용 칼럼
	private Integer unitPrice;
	private Integer warehousingCnt;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date expDate;
	private String unit; 
	private String result; // 프로시저 성공여부
}
