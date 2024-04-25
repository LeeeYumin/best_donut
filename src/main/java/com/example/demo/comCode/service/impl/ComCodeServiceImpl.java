package com.example.demo.comCode.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.comCode.ComCodeDetailVO;
import com.example.demo.comCode.ComCodeVO;
import com.example.demo.comCode.CompanyVO;
import com.example.demo.comCode.mapper.ComCodeMapper;
import com.example.demo.comCode.service.ComCodeService;

@Service
public class ComCodeServiceImpl implements ComCodeService{
	
	@Autowired ComCodeMapper comCodeMapper;

	// 1. 공통코드
	
	// 주코드 조회
	@Override
	public List<ComCodeVO> getComCodeList(ComCodeVO vo) {
		return comCodeMapper.getComCodeList(vo);
	}

	// 상세코드 조회
	@Override
	public List<ComCodeDetailVO> getComCodeDetList(ComCodeDetailVO vo) {
		return comCodeMapper.getComCodeDetList(vo);
	}

	// 주코드 입력
	@Override
	public boolean insertComCode(ComCodeVO vo) {
		return comCodeMapper.insertComCode(vo) > 0 ? true : false;
	}

	// 부코드 입력
	@Override
	public boolean insertComCodeDet(ComCodeDetailVO vo) {
		return comCodeMapper.insertComCodeDet(vo) > 0 ? true : false;
	}

	// 주코드 중복검사
	@Override
	public boolean valComCode(String maincode) {
		return comCodeMapper.valComCode(maincode) == 0 ? true : false;
	}

	// 부코드 중복검사
	@Override
	public boolean valComCodeDet(String subcode) {
		return comCodeMapper.valComCodeDet(subcode) == 0 ? true : false;
	}

	
	// 2. 거래처
	
	// 거래처 등록
	@Override
	public boolean insertCompany(CompanyVO vo) {
		return comCodeMapper.insertCompany(vo) > 0 ? true : false;
	}

	@Override
	public List<CompanyVO> getCompanySearchList(CompanyVO vo) {
		return comCodeMapper.getCompanySearchList(vo);
	}
	

}
