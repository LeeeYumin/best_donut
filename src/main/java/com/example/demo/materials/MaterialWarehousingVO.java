package com.example.demo.materials;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class MaterialWarehousingVO {
	private String matOrdersCode;
	private String companyName;
	private String matName;
	private Integer ordersCnt;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date ordersDate;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date dueDate;
}
