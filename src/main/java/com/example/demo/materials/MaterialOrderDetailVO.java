package com.example.demo.materials;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class MaterialOrderDetailVO {
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date ordersDate;
	private String companyName;
	private String ownerName;
	private String matName;
	private Integer ordersCnt;
	private Integer unitPrice;	
	private Integer matOrdersPrice;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date dueDate;
	private String usersName;
}
