package com.example.demo.materials;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class MaterialOrderReadVO {
	private String matOrdersCode;
	private String companyCode;
	private String companyName;
	private String matCode;
	private String matName;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date deliveryDate;
	private Integer matTotalOrdersPrice;
	private String totalOrdersStatus;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date ordersDate;
	private String usersCode;
	
	private String matOrdersDetailCode;
	private String prodPlanCode;
	private Integer ordersCnt;
}
