package com.example.demo.materials;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class MaterialOrderlInsertVO {
	private String matOrdersCode;
	private String prodPlanCode;
	private String usersName;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date ordersDate;
	private Integer matTotalOrdersPrice;
	private String totalOrdersStatus;
	
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date sDate;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date eDate;
	private String ordersStatus;
	

	private String companyName;
	private String ownerName;
	private String matName;
	private Integer ordersCnt;
	private Integer unitPrice;	
	private Integer matOrdersPrice;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date dueDate;
}