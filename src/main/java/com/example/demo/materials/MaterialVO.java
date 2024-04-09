package com.example.demo.materials;

import lombok.Data;

@Data
public class MaterialVO {
	private String matCode;
	private String matName;
	private Integer stockCnt;
	private Integer safeStockCnt;
	private String mainCompanyCode;
	private Integer unitPrice;
}
