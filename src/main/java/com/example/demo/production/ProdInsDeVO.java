package com.example.demo.production;

import lombok.Data;

@Data
public class ProdInsDeVO {

	//생산지시상세
	private String prodInstructDetailCode;
	private String prodPlanDetailCode;
	private String prodInstructCode;
	
	private int instructCnt;
	private int notProdCnt;
	private int prodCnt;
	
	private String productCode;
	private String productName;
}
