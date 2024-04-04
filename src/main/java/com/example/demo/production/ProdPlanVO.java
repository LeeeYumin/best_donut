package com.example.demo.production;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ProdPlanVO {
	
	//생산계획
	private String prodPlanCode;
	private String prodReqCode;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date planDate;
	private String prodPlanStatus;
	private String usersCode;
	
}
