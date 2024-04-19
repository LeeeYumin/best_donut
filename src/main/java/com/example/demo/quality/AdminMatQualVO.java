package com.example.demo.quality;

import java.util.Date;

import lombok.Data;

@Data
public class AdminMatQualVO {
	private String matLotCode;
	private String matCode;
    private Integer warehousingCnt;
    private Integer checkDoneCnt;
    private String qltyCheckStatus;
    private String matName;
    private Date inoutDate;
    private String inoutSep;
    private String lastResult;
    
    private Date searchStartDate;
    private Date searchEndDate;
}
