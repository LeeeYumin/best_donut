package com.example.demo.materials;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class MaterialOrderReadVO {
	private String matOrdersDetailCode;
	private Integer ordersCnt;
	private Integer totalPrice;
	private String ordersStatus;
	private String matOrdersCode;
	private String matCode;
	private String matName;
	private String companyCode;
	private String companyName;
	
	
	private String prodPlanCode;
	private String usersCode;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date ordersDate;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date deliveryDate;
}
