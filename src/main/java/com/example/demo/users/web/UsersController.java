package com.example.demo.users.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.users.UsersVO;
import com.example.demo.users.service.UsersService;

@Controller
public class UsersController {
	
	@Autowired UsersService usersService;

	@GetMapping("users")
	public String usersMain() {
		return "users/usersMain";
	}
	
	@GetMapping("/ajax/users")
	@ResponseBody
	public List<UsersVO> getUsers() {
		return usersService.getUsers();
	}
	
}
