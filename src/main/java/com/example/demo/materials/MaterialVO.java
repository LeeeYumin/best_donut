package com.example.demo.materials;

import lombok.Data;

@Data
public class MaterialVO {
	private String matCode;
	private String matName;
	private Double stockCnt;
	private Integer safeStockCnt;
	private String mainCompanyCode;
	private Integer unitPrice;
	private String unit;
	
	// 발주 등록 참고용 칼럼
	private Integer orderedMat;
}
