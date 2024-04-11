package com.example.demo.production;

import java.util.Date;

import lombok.Data;

@Data
public class ProcessVO {

	private String procDetailCode; //공정마다 발생되는 코드
	private String prodInstructDetailCode;
	private String procCode; //공정흐름(5단계)
	
	private Date beginTime;
	private Date endTime;

	private String procStatus;
	private String usersCode;
}
