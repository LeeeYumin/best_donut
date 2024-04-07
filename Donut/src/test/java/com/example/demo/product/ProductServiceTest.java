package com.example.demo.product;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.demo.product.mapper.ProductMapper;

@SpringBootTest
public class ProductServiceTest {
	
	@Autowired ProductMapper productMapper;

	@Test
	public void 제품조회() {
		List<ProductVO> productList = productMapper.getProduct();
		for (ProductVO list : productList) {
			System.out.println(list);
		}
	}
}
