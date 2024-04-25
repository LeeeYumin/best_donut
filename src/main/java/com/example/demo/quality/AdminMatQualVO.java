package com.example.demo.quality;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class AdminMatQualVO {
	private String matLotCode;
	private String matCode;
    private Integer warehousingCnt;
    private Integer checkDoneCnt;
    private String qltyCheckStatus;
    private String matName;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
    private Date inoutDate;
    private String inoutSep;
    private String lastResult;
    
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
    private Date searchStartDate;
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
    private Date searchEndDate;
}
