package com.example.demo.materials;

import lombok.Data;

@Data
public class MaterialOutgoingVO {
	private String prodInstructDetailCode;
	private String matLotCode;
	private Integer outCnt;
	private Integer procNeedCnt;
	private String matCode;
	private String result;
}
