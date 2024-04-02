package com.example.demo.materials.service;

import java.util.List;

import com.example.demo.materials.MaterialReadVO;
import com.example.demo.materials.MaterialVO;

public interface MaterialsService {

	public List<MaterialVO> getMaterials(String matName);

	public List<MaterialReadVO> getMaterialDetails(String matCode);

}
