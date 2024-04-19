package com.example.demo.production;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ProdInsVO {

	
	//생산지시
	private String prodInstructCode;
	private String prodPlanCode;
	private String usersCode;
	private String usersName;
	
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date instructDate;
	private Date searchStartDate;
	private Date searchEndDate;

	private String prodInstructStatus;
		
	//생산지시 상세
	List<ProdInsDeVO> pidvo;
	
	//설비상태
	private String eqmCode;
	private String eqmName;
	private String eqmStatus;
	private String oprStatus;
	
	//생산계획 상세
	List<ProdPlanDeVO> pldvo;
	
	//생산계획상태
	private String prodPlanStatus;

}
