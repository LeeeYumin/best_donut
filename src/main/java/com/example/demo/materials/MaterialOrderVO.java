package com.example.demo.materials;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class MaterialOrderVO {
	private String matOrdersCode;
	private String prodPlanCode;
	private String usersName;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date ordersDate;
	private Integer matTotalOrdersPrice;
	private String totalOrdersStatus;
	private String companyCode;
	private String usersCode;	
	
	// 조건 검색용 컬럼
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date sDate;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date eDate;
	private String ordersStatus;
	private String companyName;
	
	// 발주 등록용
	private List<MaterialOrderDetailVO> matOrderDetailVO;
}
