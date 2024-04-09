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
	
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date instructDate;

	private String prodInstructStatus;
		
	//생산지시 상세
	List<ProdInsDeVO> dvo;

}
