package com.example.demo.quality;



import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class QualityVO {
	
	//자재
	private String matQltyCheckCode;
	private String matLotCode;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date checkRecvDate;
	private String warehousingVehiclesCheck;
	private String foreignExist;
	private String packStatus;
	private String lastResult;
	private Integer goodCnt;
	private String usersCode;
	
	
	
}
