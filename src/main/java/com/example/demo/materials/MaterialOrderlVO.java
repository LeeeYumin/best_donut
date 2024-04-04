package com.example.demo.materials;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class MaterialOrderlVO {
	private String matOrdersCode;
	private String prodPlanCode;
	private String usersName;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date ordersDate;
	private Integer matTotalOrdersPrice;
	private String totalOrdersStatus;
}
