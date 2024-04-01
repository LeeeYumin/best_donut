package com.example.demo.quality.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.orders.OrdersVO;
import com.example.demo.quality.QualityVO;

@Mapper
public interface QualityMapper {

	public List<QualityVO> getMatQuality();
}
