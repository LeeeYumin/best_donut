package com.example.demo.notOpr.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.eqm.EqmVO;
import com.example.demo.notOpr.NotOprVO;
import com.example.demo.notOpr.service.NotOprService;

@Controller
public class NotOprController {
	
	@Autowired NotOprService notOprService;
	
	// 전체조회
	@GetMapping("notoprlist")
	public String notOprMain() {
		return "notOpr/notOprList";
	}
	
	@PostMapping("/ajax/notoprlist")
	@ResponseBody
	public List<NotOprVO> getNotOpr(@RequestBody NotOprVO vo) {
		return notOprService.getNotOpr(vo);
	}
	
	
	// 등록
	@GetMapping("insertnotopr")
	public String insertNotOpr(Model model, NotOprVO vo) {
		model.addAttribute("usersList", notOprService.getUsers());
		model.addAttribute("eqmList", notOprService.getEqm());
		return "notOpr/insertNotOpr";
	}
	
	@PostMapping("/ajax/insertnotopr")
	@ResponseBody
	public int insertNotOpr(NotOprVO vo) {
		return notOprService.insertNotOpr(vo);
	}
	
	
	// 단건조회
	@GetMapping("notoprinfo/{notOprCode}")
	public String notOprInfo(@PathVariable String notOprCode, Model model) {
		model.addAttribute("notOprVO", notOprService.getNotOprInfo(notOprCode));
		model.addAttribute("usersList", notOprService.getUsers());
		model.addAttribute("eqmList", notOprService.getEqm());
		return "notOpr/insertNotOpr";
	}
	
	
	// 수정
	@PostMapping("/ajax/updatenotopr")
	@ResponseBody
	public int updateNotOpr(NotOprVO vo) { 
		return notOprService.updateNotOpr(vo);
	}
	
	
	// 삭제
    @GetMapping("/deletenotopr/{notOprCode}")
    public String deleteNotOpr(@PathVariable String notOprCode) {
    	notOprService.deleteNotOpr(notOprCode);
    	return "redirect:/notoprlist";
    }
	
}
