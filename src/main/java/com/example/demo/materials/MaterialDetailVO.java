package com.example.demo.materials;

import java.sql.Date;

import lombok.Data;

@Data
public class MaterialDetailVO {
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
	private String matCode;
	private String companyCode;
}
