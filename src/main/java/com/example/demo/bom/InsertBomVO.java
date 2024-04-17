package com.example.demo.bom;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class InsertBomVO {
	
	//
	private String productCode;
	private String usersCode;
	private List<BomVO> pick;
	private String bomCode;
}
