package com.example.demo.production;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ProdPlanVO {
	
	//생산계획
	private String prodPlanCode;
	private String prodReqCode;
	
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date planDate;
	private Date searchStartDate;
	private Date searchEndDate;

	private String prodPlanStatus;
	private String usersCode;
	private String usersName;
	
	//생산계획상세
	List<ProdPlanDeVO> dvo;
	
	//생산요청상태
	private String prodReqStatus;
}
