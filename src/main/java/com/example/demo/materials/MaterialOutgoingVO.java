package com.example.demo.materials;

import lombok.Data;

@Data
public class MaterialOutgoingVO {
	private String prodInstructDetailCode;
	private String matLotCode;
	private Double outCnt;
	private Double procNeedCnt;
	private String matCode;
	private String result;
}
