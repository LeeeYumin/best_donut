package com.example.demo.materials;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class MaterialOrderDetailVO {
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date ordersDate;
	private String mainCompanyCode;
	private String matCode;
	private String ownerName;
	private Integer ordersCnt;
	private Integer unitPrice;	
	private Integer matOrdersPrice;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date dueDate;
	private String usersName;
	private String matOrdersCode;
	
	// 추가 칼럼
	private String matName;
	private String companyName;
}
