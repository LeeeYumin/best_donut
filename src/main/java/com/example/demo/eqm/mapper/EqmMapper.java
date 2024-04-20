package com.example.demo.eqm.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.eqm.EqmVO;
import com.example.demo.eqm.FileVO;

@Mapper
public interface EqmMapper {

	public List<EqmVO> getEqm(EqmVO vo);
	public int insertEqm(EqmVO vo);
	public int insertImage(FileVO fvo);
	public EqmVO getEqmInfo(String eqmCode);
	public int updateEqm(EqmVO vo);
	public int deleteEqm(String eqmCode);
	
}
