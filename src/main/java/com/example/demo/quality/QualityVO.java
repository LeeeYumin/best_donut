package com.example.demo.quality;

import java.sql.Date;

import lombok.Data;

@Data
public class QualityVO {

	private String matQltyCheckCode;
	private String matLotCode;
	private Date checkEecvDate;
	private String warehousingVehiclesCheck;
	private String foreignExist;
	private String packStatus;
	private String lastResult;
	private Integer goodCnt;
	private String usersCode;
	
	
	
}
