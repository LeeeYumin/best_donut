package com.example.demo.comCode.service;

import java.util.List;

import com.example.demo.comCode.ComCodeDetailVO;
import com.example.demo.comCode.ComCodeVO;
import com.example.demo.comCode.CompanyVO;

public interface ComCodeService {
	
	// 1. 공통코드
	public List<ComCodeVO> getComCodeList(ComCodeVO vo);
	public List<ComCodeDetailVO> getComCodeDetList(ComCodeDetailVO vo);
	public boolean valComCode(String maincode);
	public boolean valComCodeDet(String subcode);
	
	public boolean insertComCode(ComCodeVO vo);
	public boolean insertComCodeDet(ComCodeDetailVO vo);
	
	// 2. 거래처
	public boolean insertCompany(CompanyVO vo);
	public List<CompanyVO> getCompanySearchList(CompanyVO vo);
	
}
