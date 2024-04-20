package com.example.demo.materials;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class MaterialReadVO {
	private String matCode;
	private String matName;
	private Double stockCnt;
	private Integer safeStockCnt;
	
	private String matLotCode;
	private Integer warehousingCnt;
	private Integer checkDoneCnt;
	private Double outCnt;
	private Double remainCnt;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date expDate;
	private String qltyCheckStatus;
	private String matStatus;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date dumpDate;
	private Integer unitPrice;
	private String companyCode;
	
	private String unit;
	private String matUnit;
}
