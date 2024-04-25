package com.example.demo.production;



import lombok.Data;

@Data
public class ProdPlanBDeVO {
	
	//생산요청상세
	private String prodReqCode;
	private String prodReqDetailCode;
	private int reqCnt;
	private String productCode;
	private String productName;

	
}
