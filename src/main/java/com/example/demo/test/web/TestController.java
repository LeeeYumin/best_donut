package com.example.demo.test.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.test.mapper.TestMapper;

@Controller
public class TestController {
	@Autowired
	TestMapper mapper;

//	@RequestMapping("/")
//	public String test() {
//		System.out.println(mapper.getText());
//		return "layout/index"; // "/template(기본값-동적 컨텐츠)/index.html"
//	}
	
	@RequestMapping("/")
	public String test() {
		return "layout/main";
	}
	
	@RequestMapping("/sample")
	public String sample() {
		return "test/sample";
	}
}
