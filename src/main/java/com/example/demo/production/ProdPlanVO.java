package com.example.demo.production;

import java.util.Date;

import lombok.Data;

@Data
public class ProdPlanVO {
	
	//생산요청
	private String prodReqCode;
	private String totalReqCnt;
	private Date reqDate;
	private String usersCode;
	//생산요청상세
	private String prodReqDetailCode;
	private int reqCnt;
	private String productCode;
	
	
	//생산계획
	
}
