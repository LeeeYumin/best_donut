package com.example.demo.materials;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class MaterialDetailVO {
	private String matLotCode;
	private Integer warehousingCnt;
	private Integer checkDoneCnt;
	private Integer outCnt;
	private Integer remainCnt;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date expDate;
	private String qltyCheckStatus;
	private String matStatus;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date dumpDate;
	private Integer unitPrice;
	private String matCode;
	private String companyCode;
}
