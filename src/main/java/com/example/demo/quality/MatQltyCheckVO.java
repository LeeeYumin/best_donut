package com.example.demo.quality;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class MatQltyCheckVO {

	private String matQltyCheckCode;
	private String matLotCode;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date checkRecvDate;
	private String warehousingVehiclesCheck;
	private String foreignExist;
	private String packStatus;
	private String lastResult;
	private Integer goodCnt;
	private String usersCode;
	
	//등록 버튼 클릭하면 수량 update
	private Integer inoutCnt;
	private String matCode;
	private String matInoutCode;
	private Integer checkDoneCnt; //검사완료수량
	private Integer remainCnt; //적합수량
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date inoutDate;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date inoutDate2;
}
