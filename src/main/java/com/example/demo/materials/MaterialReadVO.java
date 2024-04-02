package com.example.demo.materials;

import java.sql.Date;

import lombok.Data;

@Data
public class MaterialReadVO {
	private String matCode;
	private String matName;
	private Integer stockCnt;
	private Integer safeStockCnt;
	
	private String matLotCode;
	private Integer warehousingCnt;
	private Integer checkDoneCnt;
	private Integer outCnt;
	private Integer remainCnt;
	private Date expDate;
	private String qltyCheckStatus;
	private String matStatus;
	private Date dumpDate;
	private Integer unitPrice;
	private String companyCode;
}
