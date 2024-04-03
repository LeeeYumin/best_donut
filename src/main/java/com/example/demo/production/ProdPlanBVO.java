package com.example.demo.production;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class ProdPlanBVO {
	
	//생산요청
	private String prodReqCode;
	private String totalReqCnt;
	private Date reqDate;
	private String usersCode;
	
	//생산요청상세
	List<ProdPlanBDeVO> prodReqDetail;
	

	
}
