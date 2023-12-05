package com.demo.testSpring.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import com.demo.testSpring.Details.Coordinates;
import com.demo.testSpring.Details.Details;


@Repository
public interface valuesSetter  extends ListCrudRepository<Details, Integer>{
	Details  findByCoord(Coordinates coord);
	
	@Query("SELECT date,SUM(quantity) FROM Details GROUP BY date")
	public List<?> findSumByQuantity(String date);
	
	@Query("SELECT AVG(quantity) FROM Details")
	public int findAvg();


}
