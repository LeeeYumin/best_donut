package com.example.demo.materials;

import lombok.Data;

@Data
public class MaterialOutgoingVO {
	private String prodInstructDetailCode;
	private String matLotCode;
	private Integer outCnt;
	private Integer remainCnt;
	private String matCode;
	private String result;
}
