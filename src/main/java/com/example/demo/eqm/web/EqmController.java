package com.example.demo.eqm.web;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.eqm.EqmVO;
import com.example.demo.eqm.FileVO;
import com.example.demo.eqm.service.EqmService;
import com.example.demo.users.UsersVO;

@Controller
public class EqmController {
	
	@Autowired EqmService eqmService;
	@Value("${uploadFolder}") 
    private String uploadFolder;
	
	// 전체조회
	@GetMapping("eqmlist")
	public String eqmMain() {
		return "eqm/eqmList";
	}
	
	@PostMapping("/ajax/eqmlist")
	@ResponseBody
	public List<EqmVO> getEqm(@RequestBody EqmVO vo) {
		return eqmService.getEqm(vo);
	}
	
	
	// 등록
	@GetMapping("inserteqm")
	public String insertEqmForm(EqmVO vo) {
		return "eqm/insertEqm";
	}
	
	@PostMapping("/ajax/inserteqm")
	@ResponseBody
	public int insertEqm(EqmVO vo, FileVO fvo, MultipartFile uploadFile, Model model)
			throws IllegalStateException, IOException {
		// 파일업로드
		// String uploadFolder = "/donutFile";
		
		if(uploadFile != null && uploadFile.getSize() > 0) {
			File saveFile = new File("/"+uploadFolder, uploadFile.getOriginalFilename());
			uploadFile.transferTo(saveFile);
			fvo.setSaveFileName(uploadFile.getOriginalFilename());
			eqmService.insertImage(fvo);
			vo.setImageCode(fvo.getImageCode());
		}
		
		return eqmService.insertEqm(vo);
	}
	
	
	// 단건조회
	@GetMapping("eqminfo/{eqmCode}")
	public String eqmInfo(@PathVariable String eqmCode, Model model) {
		model.addAttribute("eqmVO", eqmService.getEqmInfo(eqmCode));
		return "eqm/insertEqm";
	}
	
	
	// 수정
	@PostMapping("/ajax/updateeqm")
	@ResponseBody
	public int updateEqm(EqmVO vo) { 
		return eqmService.updateEqm(vo);
	}
	
	
	// 삭제
    @GetMapping("/deleteeqm/{eqmCode}")
    public String deleteEqm(@PathVariable String eqmCode) {
    	eqmService.deleteEqm(eqmCode);
    	return "redirect:/eqmlist";
    }
	
}
