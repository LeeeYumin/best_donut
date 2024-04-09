package com.example.demo.eqm.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.eqm.EqmVO;

@Mapper
public interface EqmMapper {

	public List<EqmVO> getEqm(EqmVO vo);
	public int insertEqm(EqmVO vo);
	
}
