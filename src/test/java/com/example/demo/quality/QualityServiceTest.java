package com.example.demo.quality;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.demo.quality.mapper.QualityMapper;

@SpringBootTest
public class QualityServiceTest {

	@Autowired
	QualityMapper qualityMapper;
	
//	@Test
//	public void 자재조회() {
//		 List<Map<String, Object>> matList = qualityMapper.getMatInfo();
//		 for(Map<String, Object> list : matList) {
//			 System.out.println(list);
//		 }
//	}
}
