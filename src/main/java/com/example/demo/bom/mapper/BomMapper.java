package com.example.demo.bom.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.bom.BomVO;

@Mapper
public interface BomMapper {
	public List<BomVO> getMatOrdersBom();
}
