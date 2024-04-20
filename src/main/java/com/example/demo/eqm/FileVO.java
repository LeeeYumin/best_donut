package com.example.demo.eqm;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class FileVO {
	
	private String imageCode;
	private String uploadFileName;
	private String saveFileName;
	private String fileSize;
	private String exten;
	private String path;
	
	private String eCode;
	
}
