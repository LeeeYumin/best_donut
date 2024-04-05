package com.example.demo.notOpr.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.notOpr.NotOprVO;

@Mapper
public interface NotOprMapper {

	public List<NotOprVO> getNotOpr(NotOprVO vo);
	
}
