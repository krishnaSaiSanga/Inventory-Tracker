package com.demo.testSpring.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.testSpring.Details.Coordinates;
import com.demo.testSpring.Details.Details;
import com.demo.testSpring.Repository.coodSetter;
import com.demo.testSpring.Repository.valuesSetter;

@Service
public class ServiceHelper {
	@Autowired
	valuesSetter set;
	@Autowired
	coodSetter cSetter;

	public void setValues(String place, int quant, Double lat,Double lng) {
		Details details=new Details();
		details.setLocation(place);
		details.setQuantity(quant);
		Date date=new Date();
		SimpleDateFormat formatter=new SimpleDateFormat("d-MMM-yyyy");
		String fdateString=formatter.format(date);
		details.setDate(fdateString);
		
		Coordinates cod=new Coordinates();
		cod.setLat(lat);
		cod.setLng(lng);
		cSetter.save(cod);
		
		details.setCoord(cod);
		
		set.save(details);
		
	}

	public List<Details> view() {
		// TODO Auto-generated method stub
		return set.findAll();
	}

	public void editvalues(String place, int quant, Double lat, Double lng,int id) {
		// TODO Auto-generated method stub
		
		
		Details details=set.findById(id).get();
		details.setLocation(place);
		details.setQuantity(quant);
		 Coordinates coordinates=details.getCoord();
		 
		 coordinates.setLat(lat);
		 coordinates.setLng(lng);
		 cSetter.save(coordinates);
		 details.setCoord(coordinates);
		
		set.save(details);
		
	}

	public void delt(int id) {
		// TODO Auto-generated method stub
		int i=set.findById(id).get().getCoord().getId();
		set.delete(set.findById(id).get());
		cSetter.deleteById(i);
		
	}
	
	public List<?> gettingGraphContents(){
		return set.findSumByQuantity("hello");
	}

	
	public int getAvg() {
	return	set.findAvg();
	}
	
	public List<?> getCoords(){
		return cSetter.findAll();
	}

}
 