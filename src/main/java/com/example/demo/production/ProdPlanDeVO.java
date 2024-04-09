package com.example.demo.production;


import lombok.Data;

@Data
public class ProdPlanDeVO {
	
	//생산계획상세
	private String prodPlanDetailCode;
	private String prodPlanCode;
	private String prodReqDetailCode;
	private String productCode;
	private int fixCnt;
	private int reqCnt;
	private int planCnt;
	private int notInstructCnt;
	private int instructDoneCnt;
	
	private String productName;
	
}
