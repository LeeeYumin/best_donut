package com.example.demo.quality;

import java.util.Date;

public class ProDetailVO {

	//PRODUCT_DETAIL
	private String productLotCode; //완제품lot코드
	private Integer warehousingCnt;
	private Integer checkDoneCnt;
	private Integer deliveryCnt;
	private Integer remainCnt;
	private String qltyCheckStatus; //품질검사상태
	private String productStatus; //완제품상태
	private Date dumpDate;
	private String productCode; //완제품코드
	
	//다른 테이블 구분
	private String productName; //product 완제품명
	private Date allEndTime; //proc_result 전체종료시간
}
