package com.example.demo.users.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	public String usersList() {
		return "users/usersList";
	}
	
	@PostMapping("/ajax/userslist")
	@ResponseBody
	public List<UsersVO> getUsers(@RequestBody UsersVO vo) {
		return usersService.getUsers(vo);
	}
	
	
	// 등록페이지
	@GetMapping("insertusers")
	public String insertUsersForm(UsersVO vo) {
//		model.addAttribute("usersList", usersService.getUsers(vo));
		return "users/insertUsers";
	}
	
	@PostMapping("/ajax/insertusers")
	@ResponseBody
	public int insertUsers(UsersVO vo) {
		return usersService.insertUsers(vo);
	}
	
	
	// 단건조회
	@GetMapping("usersinfo/{usersCode}")
	public String usersInfo(@PathVariable String usersCode, Model model) {
		model.addAttribute("usersVO", usersService.getUsersInfo(usersCode));
		return "users/insertUsers";
	}

	
}
