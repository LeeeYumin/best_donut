package com.example.demo.materials.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.materials.MaterialInOutVO;
import com.example.demo.materials.MaterialOrderDetailVO;
import com.example.demo.materials.MaterialOrderVO;
import com.example.demo.materials.MaterialOutgoingVO;
import com.example.demo.materials.MaterialReadVO;
import com.example.demo.materials.MaterialVO;
import com.example.demo.materials.MaterialWarehousingVO;
import com.example.demo.materials.service.MaterialsService;

/**
 * 자재 관리
 * 
 * @author 이효진
 *
 */
@Controller
public class MaterialsController {

	@Autowired
	MaterialsService materialsService;

	// 자재 재고 목록 페이지 이동
	@RequestMapping("/materials/stockList")
	public String materialStockList() {
		return "materials/materialStockList"; // "/template(기본값-동적 컨텐츠)/index.html"
	}

	// 재고 조회(ajax)
	@GetMapping("/ajax/materials") // fetch 함수에 들어가는 uri
	@ResponseBody
	public List<MaterialVO> getMaterials(String matName) {
		return materialsService.getMaterials(matName);
	}

	// 자재별 상세조회(ajax)
	@GetMapping("/ajax/materiallots")
	@ResponseBody
	public List<MaterialReadVO> getMaterialLots(String matCode) {
		return materialsService.getMaterialDetails(matCode);
	}

	// 자재 상태(정상 -> 폐기) 변경
	@GetMapping("/ajax/disposeMat")
	@ResponseBody
	public int updateMatStatus(String[] matLotCodes) {
		return materialsService.updateMatStatus(matLotCodes);
	}

	// 자재 발주 등록 페이지 이동
	@RequestMapping("/materials/orders")
	public String orders() {
		return "materials/materialOrders"; // "/template(기본값-동적 컨텐츠)/index.html"
	}

	// 자재 발주 등록
	@PostMapping("/ajax/matOrdersInsert")
	@ResponseBody
	public int insertOrders(@RequestBody MaterialOrderVO vo) {
		return materialsService.insertMatOrders(vo);
	}

	// 자재 발주 목록 페이지 이동
	@RequestMapping("/materials/ordersList")
	public String ordersList() {
		return "materials/materialOrdersList"; // "/template(기본값-동적 컨텐츠)/index.html"
	}

	// 자재 발주 목록 조회(ajax)
	@RequestMapping("/ajax/materialorders")
	@ResponseBody
	public List<MaterialOrderVO> getMaterialOrders(@RequestBody MaterialOrderVO vo) {
		return materialsService.getMaterialOrders(vo);
	}

	// 발주서 미리보기(ajax)
	@GetMapping("/ajax/matorderdetail")
	@ResponseBody
	public List<MaterialOrderDetailVO> getMaterialOrderDetail(String[] matOrderCodes) {
		return materialsService.getMaterialOrderDetail(matOrderCodes);
	}

	// 발주 취소(ajax)
	@GetMapping("/ajax/matordercancel")
	@ResponseBody
	public int updateMatOrderCancel(String[] matOrderCodes) {
		return materialsService.updateMatOrderCancel(matOrderCodes);
	}

	// 자재 입고 등록 페이지 이동
	@RequestMapping("/materials/warehousing")
	public String warehousing() {
		return "materials/materialWarehousing"; // "/template(기본값-동적 컨텐츠)/index.html"
	}

	// 자재 입고 대기건 조회(ajax)
	@RequestMapping("/ajax/materialwarehousing")
	@ResponseBody
	public List<MaterialWarehousingVO> getWarehousingList(@RequestBody MaterialWarehousingVO vo) {
		return materialsService.getWarehousingList(vo);
	}

	// 자재 입고 등록(ajax)
	@PostMapping("/ajax/matWarehousingInsert")
	@ResponseBody
	public int matWarehousingInsert(@RequestBody List<MaterialWarehousingVO> vo) {
		return materialsService.insertMatWarehousing(vo);
	}

	// 자재 불출 등록 페이지 이동
	@RequestMapping("/materials/outgoing")
	public String outgoing() {
		return "materials/materialOutgoing"; // "/template(기본값-동적 컨텐츠)/index.html"
	}
	
	// 자재 불출 등록(ajax)
	@PostMapping("/ajax/matOutgoingInsert")
	@ResponseBody
	public int matOutgoingInsert(@RequestBody List<MaterialOutgoingVO> vo) {
		return materialsService.insertMatOutgoing(vo);
	}

	// 자재 입고/불출 목록 페이지 이동
	@RequestMapping("/materials/inoutList")
	public String inoutList() {
		return "materials/materialInOutList"; // "/template(기본값-동적 컨텐츠)/index.html"
	}
	
	// 자재 입출고 목록(ajax)
	@PostMapping("/ajax/getMatInOutList")
	@ResponseBody
	public List<MaterialInOutVO> getMatInOutList(@RequestBody MaterialInOutVO vo) {
		return materialsService.getMatInOutList(vo);
	}
}
