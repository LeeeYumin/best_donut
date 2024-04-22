package com.example.demo.comCode.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.comCode.ComCodeDetailVO;
import com.example.demo.comCode.ComCodeVO;
import com.example.demo.comCode.CompanyVO;

@Mapper
public interface ComCodeMapper {
	
	// 1. 공통코드
	public List<ComCodeVO> getComCodeList(ComCodeVO vo);
	public List<ComCodeDetailVO> getComCodeDetList(ComCodeDetailVO vo);
	public int valComCode(String maincode);
	public int valComCodeDet(String subcode);
	
	public int insertComCode(ComCodeVO vo);
	public int insertComCodeDet(ComCodeDetailVO vo);
	
	// 2. 거래처
	public int insertCompany(CompanyVO vo);
	public List<CompanyVO> getCompanySearchList(CompanyVO vo);
	
}
