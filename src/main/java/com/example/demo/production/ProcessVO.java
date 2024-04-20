package com.example.demo.production;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ProcessVO {

	private String procDetailCode; //공정마다 발생되는 코드
	private String prodInstructDetailCode;
	private String procCode; //공정흐름(5단계)
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
	private Date beginTime;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
	private Date endTime;
	private String procStatus; //CS1 대기 / CS2 공정중 / CS3 공정완료
	private String usersCode;
	private String usersName;

	private String prodInstructCode;
	private String se; //시작종료 구분
	private String result; //프로시저 성공여부
	
	//공정
	private String serialNum;
	private String procName;
	private String eqmCode;

	//공정자재
	private String procMatCode;
	private String matName;
	private String matLotCode;
	private int matCnt;
	
	//설비
	private String oprStatus;
	private String eqmStatus;
	private String eqmName;

	

	
}
