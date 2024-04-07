package com.example.demo.users.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.users.UsersVO;
import com.example.demo.users.service.UsersService;

@Controller
public class UsersController {
	
	@Autowired UsersService usersService;
	
	// 전체조회
	@GetMapping("userslist")
	public String usersMain() {
		return "users/usersList";
	}
	
	@PostMapping("/ajax/userslist")
	@ResponseBody
	public List<UsersVO> getUsers(@RequestBody UsersVO vo) {
		return usersService.getUsers(vo);
	}
	
	// 등록
//	@GetMapping("insertUsers")
//	public String insertUsers(Model model) {
//		model.addAttribute("us")
//		return "users/insertUsers";
//	}
//	
//	@PostMapping("/ajax/userslist")
//	@ResponseBody
//	public List<UsersVO> getUsers(@RequestBody UsersVO vo) {
//		return usersService.getUsers(vo);
//	}
	
}
