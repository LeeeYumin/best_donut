package com.example.demo.production;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ProdPlanAllVO {

	//생산계획
	private String prodPlanCode;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date planDate;
	private String prodReqCode;
	private String prodPlanStatus;
	private String usersCode;
	
	//생산계획상세
	private String prodPlanDetailCode;
	//private String prodPlanCode;
	private String prodReqDetailCode;
	private String productCode;
	private int fixCnt;
	private int reqCnt;
	private int planCnt;
	private int notInstructCnt;
	private int instructDoneCnt;
	
}
