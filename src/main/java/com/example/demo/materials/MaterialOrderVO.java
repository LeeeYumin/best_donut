package com.example.demo.materials;

import lombok.Data;

@Data
public class MaterialOrderVO {
	private String matOrdersDetailCode;
	private Integer ordersCnt;
	private String ordersStatus;
	private String matOrdersCode;
	private String matCode;
	private String companyCode;
}
