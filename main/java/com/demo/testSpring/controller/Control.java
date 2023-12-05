package com.demo.testSpring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.demo.testSpring.Service.ServiceHelper;

@RestController
@CrossOrigin(origins = "*")
public class Control {
	@Autowired
	ServiceHelper setter;
	
	@PostMapping("/postdata")
	public String addValues(@RequestParam("place") String place,@RequestParam("quantity") int quant,@RequestParam("lat") Double lat,@RequestParam("lng") Double lng) {
		setter.setValues(place,quant,lat,lng);
		return "success";
	}
	
	@GetMapping("/getData")
	public ResponseEntity<?> getDetails(){
		return ResponseEntity.status(HttpStatus.OK).body(setter.view());
	}
	
	@PutMapping("/edit")
	public void edit(@RequestParam("place") String place,@RequestParam("quantity") int quant,@RequestParam("lat") Double lat,@RequestParam("lng") Double lng ,@RequestParam("id") int id){
		setter.editvalues(place,quant,lat,lng,id);
	}
	
	@DeleteMapping("/delete")
	public void dlt(@RequestParam("id") int id) {
		setter.delt(id);
	}
	
	@GetMapping("/getChart")
	public ResponseEntity<?> getChartContents(){
		return ResponseEntity.status(HttpStatus.OK).body(setter.gettingGraphContents());
	}
	@GetMapping("/getAvg")
	public ResponseEntity<?> getAerage(){
		return ResponseEntity.status(HttpStatus.OK).body( setter.getAvg());
	}

	@GetMapping("/getCoords")
	public ResponseEntity<?> getCoordinates(){
		return ResponseEntity.status(HttpStatus.OK).body(setter.getCoords());
	}

}
